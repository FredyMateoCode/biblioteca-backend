// Configuración/conexión.js
require('dotenv').config();

const mysql = require('mysql2');

// ⚠️ Se cambia a createPool
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,  // El pool esperará si todas las conexiones están en uso.
  connectionLimit: 10,       // Número máximo de conexiones simultáneas.
  queueLimit: 0              // Las peticiones no serán puestas en cola.
});

// ✅ Exportamos el pool para que sea usado en toda la aplicación
module.exports = pool;