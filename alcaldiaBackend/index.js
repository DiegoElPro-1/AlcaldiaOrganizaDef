require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// Si no hay archivo .env, usa los datos de tu MySQL local
const db = mysql
    .createPool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "alcaldiao",
    })
    .promise();

db.query("SELECT 1")
    .then(() => console.log("Conectado a MySQL"))
    .catch((err) => console.log("Error al conectar:", err.message));

// Deben coincidir con los id de SECRETARIAS en Login.jsx
const SECRETARIAS = [
    "general", "hacienda", "gobierno", "transito", "infraestructura",
    "educacion", "salud", "planeacion", "mujer", "agroambiental",
    "recreacion", "cultura", "tic",
];

const normalizarCorreo = (valor) => (typeof valor === "string" ? valor.trim().toLowerCase() : "");
const correoValido = (valor) => /^\S+@\S+\.\S+$/.test(valor);

// Compara la contraseña con lo guardado.
// Las cuentas viejas tienen la contraseña en texto plano; se aceptan una vez
// y se convierten a hash en ese mismo inicio de sesión.
async function verificarContrasena(escrita, guardada) {
    if (guardada.startsWith("$2")) return bcrypt.compare(escrita, guardada);
    const a = Buffer.from(escrita);
    const b = Buffer.from(guardada);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.post("/api/registro", async (req, res) => {
    const correo = normalizarCorreo(req.body.correo);
    const { contrasena } = req.body;

    if (!correoValido(correo)) {
        return res.status(400).json({ error: "Escribe un correo electrónico válido." });
    }
    if (typeof contrasena !== "string" || contrasena.length < 8) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres." });
    }

    try {
        const hash = await bcrypt.hash(contrasena, 10);
        const [result] = await db.query(
            "INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)",
            [correo, hash]
        );
        res.status(201).json({ mensaje: "Usuario registrado", id: result.insertId });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Ese correo ya está registrado." });
        }
        console.error(err);
        res.status(500).json({ error: "No se pudo crear la cuenta. Intenta de nuevo." });
    }
});

app.post("/api/login", async (req, res) => {
    const correo = normalizarCorreo(req.body.correo);
    const { contrasena, secretaria } = req.body;

    if (!correoValido(correo) || typeof contrasena !== "string" || !contrasena) {
        return res.status(400).json({ error: "Escribe tu correo y tu contraseña." });
    }
    if (!SECRETARIAS.includes(secretaria)) {
        return res.status(400).json({ error: "Elige una secretaría válida." });
    }

    try {
        const [filas] = await db.query(
            "SELECT id, correo, contrasena, secretaria FROM usuarios WHERE correo = ?",
            [correo]
        );
        const usuario = filas[0];

        // Mismo mensaje si el correo no existe o la contraseña falla
        if (!usuario || !(await verificarContrasena(contrasena, usuario.contrasena))) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos." });
        }

        if (usuario.secretaria && usuario.secretaria !== secretaria) {
            return res.status(403).json({ error: "Tu cuenta no pertenece a esa secretaría." });
        }

        // Cambios pendientes: guardar el hash y fijar la secretaría la primera vez
        const cambios = {};
        if (!usuario.contrasena.startsWith("$2")) cambios.contrasena = await bcrypt.hash(contrasena, 10);
        if (!usuario.secretaria) cambios.secretaria = secretaria;

        if (Object.keys(cambios).length > 0) {
            await db.query("UPDATE usuarios SET ? WHERE id = ?", [cambios, usuario.id]);
        }

        res.json({
            mensaje: "Sesión iniciada",
            usuario: { id: usuario.id, correo: usuario.correo, secretaria },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "No se pudo iniciar sesión. Intenta de nuevo." });
    }
});

const PUERTO = process.env.PORT || 4000;
app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});