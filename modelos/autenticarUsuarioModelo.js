// modelos/autenticarUsuarioModelo.js
const pool = require('../configuracion/conexion'); // Se importa el pool

//Definimos y exportamos la función principal obtenerUsuarioPorNombre para poder poder obtener el usuarios de la DB:
//En (usuario) recibimos el argumento
exports.obtenerUsuarioPorNombre = (usuario) => {
  //Aqui se ejecuta una fucnión asincrona que obtendra un valor en el futuro con dos posibles resultados: 
  return new Promise((resolve, reject) => {
    // ⚠️ Se obtiene una conexión del pool antes de la consulta
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      // Declaramos la consulta ? es un pilar de seguridad para evitar inyecciones SQL.
      const consulta = `SELECT
        u.id_us,
        u.usuario_us,
        u.password_us,
        r.nombre_rol AS rol_nombre 
      FROM usuarios u
      INNER JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.usuario_us = ?`;
      // Pasamos los argumentos consulta, usuario(Frontend) y callback
      connection.query(consulta, [usuario], (error, results) => {
        // ✅ Se libera la conexión para que regrese al pool para que pueda se utilizada en otros solicitudes
        connection.release();
        //Manejo de resultados
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  });
};