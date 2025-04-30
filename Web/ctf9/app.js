require('dotenv').config();
const express = require("express");
const sqlite3 = require("sqlite3");
const fs = require("fs");

const app = express();
const BASE_URL = process.env.API_PREFIX || '/nodejs';
const db = new sqlite3.Database(":memory:");

const flag = fs.readFileSync("./flag.txt", { encoding: "utf8" }).trim();
const crystals = require("./crystals");

db.serialize(() => {
  db.run("CREATE TABLE crystals (name TEXT, price REAL, quantity INTEGER)");

  const stmt = db.prepare("INSERT INTO crystals (name, price, quantity) VALUES (?, ?, ?)");

  for (const crystal of crystals) {
    stmt.run(crystal["name"], crystal["price"], crystal["quantity"]);
  }
  stmt.finalize();

  db.run("CREATE TABLE IF NOT EXISTS flag (flag TEXT)");
  db.run(`INSERT INTO flag (flag) VALUES ('${flag}')`);
});

const router = express.Router();

router.get("/crystals", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).send({ err: "Missing required fields" });
  }

  db.all(`SELECT * FROM crystals WHERE name LIKE '%${name}%'`, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal server error');
    }

    return res.send(rows);
  });
});

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(BASE_URL, express.static('public'));

app.use(BASE_URL, router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
