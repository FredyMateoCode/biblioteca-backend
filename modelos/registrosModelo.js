// ✅ Importa tu conexión a la base de datos (asegúrate de que la ruta sea correcta)
const pool = require('../configuracion/conexion.js');

// ✅ Función asíncrona para insertar un nuevo registro
const crearRegistroDB = async (datosRegistro) => {
  const sql = 'INSERT INTO registros SET ?'; // ✅ Consulta SQL para la inserción
  
  return new Promise((resolve, reject) => {
    // db.query se usa para ejecutar la consulta SQL
    pool.query(sql, datosRegistro, (error, resultado) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        return reject(error);
      }
      resolve(resultado); // Resuelve la promesa con el resultado de la inserción
    });
  });
};

module.exports = {
  crearRegistroDB,
};