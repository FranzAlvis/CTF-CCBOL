require('dotenv').config();
const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
const BASE_URL = '/nodejs';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const users = {
  'usuario': { password: 'usuario', role: 'usuario' },
  'admin': { password: 'adminpass', role: 'admin' }
};

// Ruta base para todas las rutas
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  
  if (users[usuario] && users[usuario].password === password) {
    const token = jwt.sign({ usuario, role: users[usuario].role }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Acceso exitoso', role: users[usuario].role });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.redirect(BASE_URL);
  }

  try {
    const decoded = jwt.decode(token);
    req.user = decoded;
    next();
  } catch (error) {
    req.user = { role: 'usuario' };
    next();
  }
}

router.get('/dashboard', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

router.get('/usuario-info', verifyToken, (req, res) => {
  res.json({ role: req.user.role });
});

router.get('/flag', verifyToken, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ flag: 'CCBOL_SUCRE{el_password_mas_seguro}' });
  } else {
    res.status(403).json({ message: 'Acceso denegado' });
  }
});

router.post('/salir', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Sesión cerrada exitosamente' });
});

// Manejar rutas no encontradas
router.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Usar el router con el prefijo '/nodejs'
app.use(BASE_URL, router);

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN;

const server = http.createServer(app);
server.listen(PORT, DOMAIN, () => {
  console.log(`Servidor corriendo en http://${DOMAIN}:${PORT}${BASE_URL}`);
});
