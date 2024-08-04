import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.get("/gato", (req, res) => {
  let { categoria } = req.query;

  if (categoria.length == 1) {
    const filepath = path.resolve("./nombres/" + categoria);
    const lines = fs.readFileSync(filepath, "utf-8").split("\n");
    const nombre = lines[Math.floor(Math.random() * lines.length)];

    res.status(200);
    res.send({ nombre });
    return;
  }

  res.status(500);
  res.send({ error: "No se puede generar el nombre" });
});

app.get("/", (_, res) => {
  res.status(200);
  res.sendFile(path.resolve("index.html"));
});

app.listen(3001);
