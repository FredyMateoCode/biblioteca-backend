// modelos/evaluarCuestionarioModelo.js

const pool = require('../configuracion/conexion.js'); 

/**
 * Obtiene las IDs de las opciones correctas y sus puntuaciones 
 * para las preguntas de un cuestionario.
 * @param {number} idCuest - El ID del cuestionario a evaluar.
 * @param {function} callback - Función de retorno (err, respuestasCorrectas).
 */
const obtenerRespuestasCorrectas = (idCuest, callback) => {
    // Consulta SQL para obtener la opción correcta (id_opcion) y la puntuación de esa pregunta.
    const consulta = `
        SELECT
            p.id_preg,
            o.id_opcion AS id_opcion_correcta,
            p.puntuacion_preg
        FROM 
            preguntas p
        INNER JOIN 
            opciones o ON p.id_preg = o.id_preg
        WHERE 
            p.id_cuest = ? AND o.es_correcta_opcion = TRUE;
    `;
    
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err, null);
        }
        
        connection.query(consulta, [idCuest], (err, resultados) => {
            connection.release(); 
            
            if (err) {
                return callback(err, null);
            }
            
            // Los resultados son un array de objetos: 
            // [{id_preg: 1, id_opcion_correcta: 2, puntuacion_preg: 1.00}, ...]
            callback(null, resultados);
        });
    });
};

module.exports = { obtenerRespuestasCorrectas };