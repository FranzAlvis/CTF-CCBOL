const express = require('express');
const crypto = require('crypto');

const app = express();

const db = require('better-sqlite3')('db.sqlite3');
db.exec(`DROP TABLE IF EXISTS users;`);
db.exec(`CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    usuario TEXT,
    password TEXT
);`);

const FLAG = "CCBOL_SUCRE{login_magico}";
const PORT = 3002;

const users = [...Array(100_000)].map(() => ({ user: `user-${crypto.randomUUID()}`, pass: crypto.randomBytes(8).toString("hex") }));
db.exec(`INSERT INTO users (id, usuario, password) VALUES ${users.map((u,i) => `(${i}, '${u.user}', '${u.pass}')`).join(", ")}`);

const isAdmin = {};
const newAdmin = users[Math.floor(Math.random() * users.length)];
isAdmin[newAdmin.user] = true;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/nodejs/login", (req, res) => {
    const { user, pass } = req.body;

    const query = `SELECT id FROM users WHERE usuario = '${user}' AND password = '${pass}';`;
    try {
        const id = db.prepare(query).get()?.id;
        if (!id) {
            return res.redirect("/?message=Usuario o password incorrecto");
        }

        if (users[id] && isAdmin[user]) {
            return res.redirect("/?flag=" + encodeURIComponent(FLAG));
        }
        return res.redirect("/?message=Este sistema es solo para administradores...");
    }
    catch {
        return res.redirect("/?message=Buen intento...");
    }
});

app.listen(PORT, () => console.log(`login ccbol se esta ejecutando en ${PORT}`));