// src/modelos/eliminarRegistroModelo.js
const pool = require('../configuracion/conexion.js'); // ✅ Asegúrate de que esta ruta sea correcta

const eliminarRegistro = (id, callback) => {
    const sql = 'DELETE FROM registros WHERE id_reg = ?';
    
    // Usa la conexión del pool con callbacks
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err);
        }
        
        // Ejecuta la consulta
        connection.query(sql, [id], (err, resultado) => {
            // Siempre libera la conexión
            connection.release();
            
            if (err) {
                return callback(err);
            }
            
            callback(null, resultado);
        });
    });
};

module.exports = { eliminarRegistro };