// controladores/mostrarPuntajesControlador.js

// Importamos la función del modelo que acabamos de crear
const { obtenerPuntajesPorEstudiante } = require('../modelos/mostrarPuntajesModelo.js'); 

/**
* Maneja la solicitud GET para obtener el historial de puntajes de un estudiante por DNI.
*/
const mostrarPuntajes = (req, res) => {
    // 1. Obtener el DNI desde los parámetros de la URL
    // Asumimos que la URL es /api/puntajes/:dni
    const dniEstudianteString = req.params.dni; 

    if (!dniEstudianteString) {
        return res.status(400).json({ error: 'Falta el DNI del estudiante en la ruta.' });
    }

    // Convertir a número (similar a cómo lo manejaste en el listado de cuestionarios)
    const dniEstudiante = parseInt(dniEstudianteString, 10);
    
    if (isNaN(dniEstudiante)) {
        return res.status(400).json({ error: 'El DNI proporcionado no es un número válido.' });
    }

    // 2. Llamar al Modelo
    obtenerPuntajesPorEstudiante(dniEstudiante, (err, resultados) => {
        if (err) {
            console.error("Error al obtener puntajes desde el servidor:", err);
            // Devolver un error 500 (Error Interno del Servidor)
            return res.status(500).json({ error: 'Hubo un error en el servidor al cargar los puntajes.' });
        }
        
        // 3. Devolver la lista de resultados (puede ser vacía si el estudiante no tiene)
        res.json(resultados);
    });
};

module.exports = { mostrarPuntajes };