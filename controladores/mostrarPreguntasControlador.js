// controladores/mostrarPreguntasControlador.js

const { obtenerCuestionarioCompleto } = require('../modelos/mostrarPreguntasModelo.js');

const mostrarPreguntas = (req, res) => {
    const idCuestionario = parseInt(req.params.idCuest); 

    if (isNaN(idCuestionario)) {
        return res.status(400).json({ error: 'ID de cuestionario no válido.' });
    }

    // Llama a la función que devuelve el objeto { nombre_cuest, preguntas }
    obtenerCuestionarioCompleto(idCuestionario, (err, resultados) => {
        if (err) {
            console.error('Error al obtener el cuestionario completo:', err);
            // Si el error es de BD o "No encontrado", devolvemos el 500
            return res.status(500).json({ error: err.message || 'Hubo un error al obtener las preguntas del cuestionario.' });
        }
        
        // Devolvemos el objeto completo: { nombre_cuest: '...', preguntas: [...] }
        res.json(resultados); 
    });
};

module.exports = { mostrarPreguntas };