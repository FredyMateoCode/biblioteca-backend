// Importamos el nuevo modelo
const { obtenerEstudiantePorDni } = require('../modelos/filtrarEstudianteDniModelo.js');

// Función del controlador para buscar y devolver los datos del estudiante
const buscarEstudiantePorDni = (req, res) => {
    const { dni } = req.params;
    
    obtenerEstudiantePorDni(dni, (err, estudiante) => {
        if (err) {
            return res.status(500).json({ error: 'Hubo un error al buscar al Estudiante.' });
        }
        
        if (estudiante) {
            res.status(200).json(estudiante);
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado.' });
        }
    });
};

module.exports = { buscarEstudiantePorDni };