// models/mostrarPreguntasModelo.js (o la ruta correspondiente)

// Importamos el pool de conexiones
const pool = require('../configuracion/conexion.js'); 

// modelos/mostrarPreguntasModelo.js (Añadir o modificar la función principal)

const obtenerCuestionarioCompleto = (idCuest, callback) => {
    // Consulta para obtener las preguntas y opciones ANIDADAS
    const consultaPreguntas = `
        SELECT
            p.id_preg,
            p.texto_preg,
            p.tipo_preg,
            p.puntuacion_preg,
            CONCAT('[', GROUP_CONCAT(
                JSON_OBJECT('id_opcion', o.id_opcion, 'texto_opcion', o.texto_opcion)
            ), ']') AS opciones_json
        FROM 
            preguntas p
        INNER JOIN 
            opciones o ON p.id_preg = o.id_preg
        WHERE 
            p.id_cuest = ? 
        GROUP BY 
            p.id_preg, p.texto_preg, p.tipo_preg, p.puntuacion_preg
        ORDER BY 
            p.id_preg;
    `;
    
    // Consulta para obtener el nombre del cuestionario
    const consultaCuestionario = 'SELECT nombre_cuest FROM cuestionarios WHERE id_cuest = ?';

    pool.getConnection((err, connection) => {
        if (err) return callback(err);

        // 1. Obtener el nombre del cuestionario
        connection.query(consultaCuestionario, [idCuest], (err, resCuest) => {
            if (err) { connection.release(); return callback(err); }
            if (resCuest.length === 0) { connection.release(); return callback(new Error('Cuestionario no encontrado')); }
            
            const nombreCuest = resCuest[0].nombre_cuest;

            // 2. Obtener las preguntas y opciones
            connection.query(consultaPreguntas, [idCuest], (err, resPreguntas) => {
                connection.release();
                if (err) return callback(err);
                
                // Post-procesamiento
                const preguntasFormateadas = resPreguntas.map(pregunta => ({
                    ...pregunta,
                    opciones: JSON.parse(pregunta.opciones_json)
                }));
                
                // Devolver un objeto con el título y las preguntas
                callback(null, { nombre_cuest: nombreCuest, preguntas: preguntasFormateadas });
            });
        });
    });
};

module.exports = { obtenerCuestionarioCompleto }; // Exportamos la nueva función