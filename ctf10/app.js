import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const BASE_URL = process.env.API_PREFIX || '/nodejs';

app.get(`${BASE_URL}/gato`, (req, res) => {
  let { categoria } = req.query;

  if (categoria && categoria.length === 1) {
    const filepath = path.resolve(`./nombres/${categoria}`);
    const lines = fs.readFileSync(filepath, "utf-8").split("\n");
    const nombre = lines[Math.floor(Math.random() * lines.length)];

    res.status(200).send({ nombre });
    return;
  }

  res.status(500).send({ error: "No se puede generar el nombre" });
});

app.get(`${BASE_URL}/`, (_, res) => {
  res.status(200).sendFile(path.resolve("index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}${BASE_URL}`);
});
