require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const app = express();
const BASE_URL = process.env.API_PREFIX || '/nodejs'; // Usa el prefijo del archivo .env

const db = require('better-sqlite3')('db.sqlite3');
db.exec(`DROP TABLE IF EXISTS users;`);
db.exec(`CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    usuario TEXT,
    password TEXT
);`);

const FLAG = "CCBOL_SUCRE{login_magico}";
const PORT = process.env.PORT || 3002;

const users = [...Array(100_000)].map(() => ({ user: `user-${crypto.randomUUID()}`, pass: crypto.randomBytes(8).toString("hex") }));
db.exec(`INSERT INTO users (id, usuario, password) VALUES ${users.map((u,i) => `(${i}, '${u.user}', '${u.pass}')`).join(", ")}`);

const isAdmin = {};
const newAdmin = users[Math.floor(Math.random() * users.length)];
isAdmin[newAdmin.user] = true;

app.use(express.urlencoded({ extended: false }));
app.use(BASE_URL, express.static(path.join(__dirname, 'public')));

app.post(`${BASE_URL}/login`, (req, res) => {
    const { user, pass } = req.body;

    const query = `SELECT id FROM users WHERE usuario = '${user}' AND password = '${pass}';`;
    try {
        const id = db.prepare(query).get()?.id;
        if (!id) {
            return res.redirect(`${BASE_URL}/?message=Usuario o password incorrecto`);
        }

        if (users[id] && isAdmin[user]) {
            return res.redirect(`${BASE_URL}/?flag=${encodeURIComponent(FLAG)}`);
        }
        return res.redirect(`${BASE_URL}/?message=Este sistema es solo para administradores...`);
    }
    catch {
        return res.redirect(`${BASE_URL}/?message=Buen intento...`);
    }
});

app.listen(PORT, () => console.log(`login ccbol se está ejecutando en http://localhost:${PORT}${BASE_URL}`));
