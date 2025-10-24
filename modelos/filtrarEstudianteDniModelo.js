// Importamos el pool de conexiones
const pool = require('../configuracion/conexion.js');

// Función para obtener un solo estudiante por su DNI
const obtenerEstudiantePorDni = (dni, callback) => {
    const consulta = 'SELECT * FROM estudiantes WHERE dni_est = ?';
    
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err, null);
        }
        
        connection.query(consulta, [dni], (err, resultados) => {
            connection.release();
            if (err) {
                return callback(err, null);
            }
            const estudiante = resultados.length > 0 ? resultados[0] : null;
            callback(null, estudiante);
        });
    });
};

module.exports = { obtenerEstudiantePorDni };