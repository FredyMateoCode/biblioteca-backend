// modelos/puntajeModelo.js

// Importa el pool de conexiones (ajusta la ruta si es necesario)
const pool = require('../configuracion/conexion.js');

/**
 * Función para insertar el resultado de una evaluación en la tabla 'resultados'.
 * @param {string} dniEstudiante - DNI del estudiante.
 * @param {number} idCuestionario - ID del cuestionario resuelto.
 * @param {number} puntajeObtenido - Puntaje final obtenido.
 * @param {function} callback - Callback (err, resultado) para Express.
 */
const guardarPuntaje = (dniEstudiante, idCuestionario, puntajeObtenido, callback) => {
    
    // La consulta INSERT utiliza los campos de tu tabla 'resultados'
    const consulta = `
        INSERT INTO resultados (dni_est, id_cuest, puntaje_obtenido)
        VALUES (?, ?, ?);
    `;
    const valores = [dniEstudiante, idCuestionario, puntajeObtenido];

    // Obtiene una conexión del pool
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err, null);
        }
        
        // Ejecuta la consulta de inserción
        connection.query(consulta, valores, (err, resultados) => {
            // Siempre libera la conexión
            connection.release();
            
            if (err) {
                return callback(err, null);
            }
            
            // Devuelve el resultado de la inserción (ej. affectedRows, insertId)
            callback(null, resultados);
        });
    });
};

module.exports = { guardarPuntaje };