// Importar dependencias
require("dotenv").config(); // Cargar variables de entorno desde el archivo .env
const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Prueba de conexión a PostgreSQL
pool.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch((err) => console.error("Error conectando a PostgreSQL:", err));

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Rutas principales
app.get("/", (req, res) => {
  res.send("¡Servidor backend Ok!");
});

// CRUD: Operaciones para la tabla "datos"

// 1. Listar todos los datos
app.get("/datos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM datos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al obtener los datos");
  }
});

// 2. Agregar un nuevo dato
app.post("/datos", async (req, res) => {
  const { nombre } = req.body; // Nombre recibido en el cuerpo de la solicitud
  try {
    const result = await pool.query(
      "INSERT INTO datos (nombre) VALUES ($1) RETURNING *",
      [nombre]
    );
    res.json(result.rows[0]); // Devolver el dato recién agregado
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al agregar el dato");
  }
});

// 3. Modificar un dato existente
app.put("/datos/:id", async (req, res) => {
  const { id } = req.params; // ID del dato a modificar
  const { nombre } = req.body; // Nuevo valor para "nombre"
  try {
    const result = await pool.query(
      "UPDATE datos SET nombre = $1 WHERE id = $2 RETURNING *",
      [nombre, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Dato no encontrado");
    }
    res.json(result.rows[0]); // Devolver el dato modificado
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al modificar el dato");
  }
});

// 4. Eliminar un dato
app.delete("/datos/:id", async (req, res) => {
  const { id } = req.params; // ID del dato a eliminar
  try {
    const result = await pool.query(
      "DELETE FROM datos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Dato no encontrado");
    }
    res.send("Dato eliminado"); // Confirmar eliminación
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error al eliminar el dato");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
