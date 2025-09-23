// src/controladores/eliminarRegistroControlador.js
const { eliminarRegistro } = require('../modelos/eliminarRegistroModelo.js');

// ✅ Reemplaza todo el contenido de este archivo con el siguiente código
const eliminar = (req, res) => {
    const { id } = req.params;

    eliminarRegistro(id, (err, resultado) => {
        if (err) {
            console.error('Error al eliminar el registro:', err);
            return res.status(500).json({ error: 'Hubo un error al eliminar el registro.' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json({ message: 'Registro eliminado correctamente' });
    });
};

// ✅ Exporta la función dentro de un objeto
module.exports = { eliminar };