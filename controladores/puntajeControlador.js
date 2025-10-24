// controladores/puntajeControlador.js

// Importa el modelo de la función de inserción
const { guardarPuntaje } = require('../modelos/puntajeModelo.js');

/**
 * Controlador para gestionar la solicitud POST y guardar el puntaje.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
const registrarPuntaje = (req, res) => {
    
    // Extraemos los datos necesarios de req.body y req.usuario (del middleware)
    const { id_cuestionario, puntaje_obtenido, dni_estudiante } = req.body;
    
    // El DNI seguro del token (usando el campo 'usuario' que configuraste)
    const dniSeguro = req.usuario.usuario; 

    // Verificación de Seguridad CRÍTICA (debe hacerse aquí o en la ruta)
    if (String(dni_estudiante) !== String(dniSeguro)) {
        return res.status(403).json({ mensaje: 'Error de seguridad: DNI no autorizado.' });
    }

    // Llama al Modelo con los datos
    guardarPuntaje(dniSeguro, id_cuestionario, puntaje_obtenido, (err, resultado) => {
        if (err) {
            console.error('Error al guardar el puntaje en la DB:', err);
            return res.status(500).json({ error: 'Hubo un error al registrar el puntaje.' });
        }
        
        // Respuesta de éxito (código 201 Created)
        res.status(201).json({ 
            mensaje: 'Puntaje registrado exitosamente.', 
            id_registro: resultado.insertId 
        });
    });
};

// Exportamos la función para que pueda ser utilizada en la ruta
module.exports = { registrarPuntaje };