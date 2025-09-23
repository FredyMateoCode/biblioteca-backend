// controladores/editarRegistroControlador.js
const editarRegistroModelo = require('../modelos/editarRegistroModelo.js');

const editarRegistroControlador = (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  // Llama a la función del modelo con un callback
  editarRegistroModelo.actualizar(id, datosActualizados, (error, resultado) => {
    if (error) {
      console.error('Error al actualizar registro:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: `Registro con ID ${id} no encontrado.` });
    }

    res.status(200).json({ mensaje: 'Registro actualizado con éxito.' });
  });
};

module.exports = {
  editarRegistroControlador,
};