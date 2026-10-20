const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Juanca1995",
    database: "alcaldiao"
});

db.connect((err) => {
    if (err) {
        console.log("Error al conectar:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.post("/api/registro", (req, res) => {
    const { correo, contrasena } = req.body;

    db.query(
        "INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)",
        [correo, contrasena],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ mensaje: "Usuario registrado", id: result.insertId });
        }
    );
});

app.listen(4000, () => {
    console.log("Servidor en http://localhost:4000");
});