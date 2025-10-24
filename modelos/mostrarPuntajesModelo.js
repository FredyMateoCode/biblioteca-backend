// modelos/mostrarPuntajesModelo.js

// Importamos el pool de conexiones que ahora está en conexión.js
const pool = require('../configuracion/conexion.js'); 

/**
* Obtiene el historial de resultados (puntajes) de un estudiante específico.
* @param {number} dniEstudiante - El DNI del estudiante logueado.
* @param {function} callback - Función de retorno (error, resultados).
*/
const obtenerPuntajesPorEstudiante = (dniEstudiante, callback) => {
    
    // Consulta SQL: Une 'resultados' con 'cuestionarios' para obtener el nombre del examen.
    const consulta = `
        SELECT 
            r.id_res,
            r.puntaje_obtenido,
            r.fecha_registro,
            c.nombre_cuest,
            c.descripcion_cuest
        FROM resultados r
        JOIN cuestionarios c ON r.id_cuest = c.id_cuest
        WHERE r.dni_est = ?
        ORDER BY r.fecha_registro DESC
    `;
    
    // Los valores de la consulta parametrizada
    const valores = [dniEstudiante];

    console.log("DEBUG MODELO PUNTAJES: Buscando resultados para DNI:", dniEstudiante);

	// ⚠️ 1. Obtiene una conexión del pool
	pool.getConnection((err, connection) => {
		if (err) {
			console.error("ERROR CRÍTICO: Falla al obtener conexión a la DB para puntajes.", err.message);
			return callback(err, null);
		}
        
		// ⚠️ 2. Usa la conexión para ejecutar la consulta
		connection.query(consulta, valores, (err, resultados) => {
			// ✅ 3. Siempre libera la conexión para que vuelva al pool
			connection.release();
			
			if (err) {
                console.error("ERROR CRÍTICO: Fallo al ejecutar consulta de puntajes. Mensaje:", err.message);
				return callback(err, null);
			}
			
			callback(null, resultados); // Devuelve la lista de resultados
		});
	});
};

// Se exporta la función principal con el nombre que usarás en el controlador
module.exports = { obtenerPuntajesPorEstudiante };