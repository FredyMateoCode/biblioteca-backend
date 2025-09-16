//Importamos el pool de conexiones que ahora está en conexión.js
const pool = require('../configuracion/conexion.js');

/*Cambia la forma en que se ejecuta la consulta para usar el pool*/
/*Nombres cambiados: */
const obtenerEstudiantes = (callback) => {
	const consulta = 'SELECT * FROM estudiantes';
	
	// ⚠️ 1. Obtiene una conexión del pool
	pool.getConnection((err, connection) => {
		if (err) {
			// Si no se puede obtener una conexión, devuelve un error
			return callback(err, null);
		}
		
		// ⚠️ 2. Usa la conexión para ejecutar la consulta
		connection.query(consulta, (err, resultados) => {
			// ✅ 3. Siempre libera la conexión para que vuelva al pool
			connection.release();
			
			if (err) {
				return callback(err, null);
			}
			
			callback(null, resultados);
		});
	});
};

module.exports = { obtenerEstudiantes };