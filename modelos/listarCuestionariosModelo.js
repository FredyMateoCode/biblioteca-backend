// modelos/listarCuestionariosModelo.js

const pool = require('../configuracion/conexion.js'); 

/**
* Obtiene la lista de cuestionarios disponibles.
* Implementa doble filtro: por GRADO (consultando la tabla estudiantes) y por NOT EXISTS (cuestionarios no respondidos).
*/
const obtenerListaCuestionarios = (dniEstudiante, callback) => { 
    
    console.log("DEBUG MODELO: DNI final para SQL:", dniEstudiante);

    // 🛑 1. INTENTAR OBTENER CONEXIÓN AL POOL 🛑
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("ERROR CRÍTICO: Falla al obtener conexión a la DB.", err);
            return callback(err, null);
        }
        
        console.log("DEBUG MODELO: Conexión a DB obtenida con éxito. Buscando grado...");

        let dniValido = dniEstudiante && !isNaN(dniEstudiante);

        // 🛑 2. CONSULTA AUXILIAR: BUSCAR EL GRADO DEL ESTUDIANTE 🛑
        if (dniValido) {
            
            // 🛑 CORRECCIÓN CLAVE: Usamos 'grado_inicial_est' en la tabla 'estudiantes'
            const gradoQuery = 'SELECT grado_inicial_est FROM estudiantes WHERE dni_est = ?'; 
            
            connection.query(gradoQuery, [dniEstudiante], (err, results) => {
                
                if (err) {
                    connection.release();
                    console.error("ERROR SQL: Fallo al buscar el grado del estudiante.", err);
                    return callback(err, null);
                }

                // Si se encuentra, el valor es el grado
                let gradoEstudiante = (results.length > 0) ? results[0].grado_inicial_est : null;
                console.log("DEBUG MODELO: Grado encontrado:", gradoEstudiante);

                // Ejecutamos la consulta principal con los datos del usuario
                ejecutarConsultaPrincipal(connection, dniEstudiante, gradoEstudiante, callback);
            });
            
        } else {
            // Si no hay DNI, ejecutamos la consulta principal sin filtros de usuario/grado
            ejecutarConsultaPrincipal(connection, null, null, callback);
        }
    });
};

/**
 * Función auxiliar para construir y ejecutar la consulta principal con los filtros.
 */
const ejecutarConsultaPrincipal = (connection, dniEstudiante, gradoEstudiante, callback) => {
    
    // SELECT usa las columnas que confirmamos que existen
    let consulta = `
        SELECT c.id_cuest, c.nombre_cuest, c.descripcion_cuest 
        FROM cuestionarios c
        WHERE 1 = 1 
    `;
    
    let valores = [];

    // 🛑 3. FILTRO PRINCIPAL: POR GRADO 🛑
    // Usamos 'grado_destino' como la columna en la tabla 'cuestionarios' (asumimos que la creaste)
    if (gradoEstudiante && !isNaN(gradoEstudiante)) {
        consulta += ` AND c.grado_destino = ? `; 
        valores.push(gradoEstudiante);
    }

    // 🛑 4. FILTRO SECUNDARIO: POR NOT EXISTS (No Respondidos) 🛑
    if (dniEstudiante && !isNaN(dniEstudiante)) {
        consulta += `
            AND NOT EXISTS (
                SELECT 1
                FROM resultados r
                WHERE r.id_cuest = c.id_cuest
                AND r.dni_est = ?
            )
        `;
        valores.push(dniEstudiante); 
    }

    // DEBUG: Muestra la consulta SQL final ANTES de la ejecución
    console.log("DEBUG MODELO: Consulta SQL final:", consulta);

    // 5. Ejecutar la consulta final
    connection.query(consulta, valores, (err, resultados) => { 
        connection.release(); // Siempre liberar la conexión
        
        if (err) {
            console.error("ERROR CRÍTICO: Fallo al ejecutar consulta SQL final. Mensaje:", err.message);
            return callback(err, null);
        }
        
        callback(null, resultados);
    });
};

module.exports = { obtenerListaCuestionarios };