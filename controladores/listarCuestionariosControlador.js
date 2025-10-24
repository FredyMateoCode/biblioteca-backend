// controladores/listarCuestionariosControlador.js

const { obtenerListaCuestionarios } = require('../modelos/listarCuestionariosModelo.js');

/**
 * Controlador de Express para obtener y devolver la lista de todos los cuestionarios,
 * permitiendo filtrar por DNI.
 */
const listarCuestionarios = (req, res) => {
    
    // 1. Leer el parámetro de consulta del Frontend
    const dniEstudianteString = req.query.dni; 
    
    // 🛑 DEBUG CRÍTICO: Muestra lo que se recibe de la URL (Debería ser "77880896")
    console.log("DEBUG BACKEND CRÍTICO: DNI recibido de la URL (STRING):", dniEstudianteString);
    
    let dniEstudiante = null;
    
    // 2. Intentar convertir a número solo si el valor existe y no es la cadena 'null'
    //    Usamos una verificación robusta para convertir a INT o establecer en null.
    if (dniEstudianteString && dniEstudianteString !== 'null') {
        const parsedDNI = parseInt(dniEstudianteString, 10);

        // Asignamos solo si la conversión resulta en un número válido
        if (!isNaN(parsedDNI)) {
            dniEstudiante = parsedDNI;
        }
    }

    // 🛑 DEBUG: Muestra lo que se enviará al Modelo (Debería ser 77880896)
    console.log("DEBUG BACKEND: DNI recibido y enviado al Modelo (como número):", dniEstudiante);
    
    // 3. Llamar al Modelo con el DNI convertido (será un número o null)
    obtenerListaCuestionarios(dniEstudiante, (err, cuestionarios) => {
        if (err) {
            // El error que estás viendo en el Frontend se origina aquí (Error 500)
            console.error("Error al obtener la lista de cuestionarios:", err);
            return res.status(500).json({ error: 'Hubo un error en el servidor al listar los cuestionarios XXX.' });
        }
        
        res.json(cuestionarios);
    });
};

module.exports = { listarCuestionarios };