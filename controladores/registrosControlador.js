// src/controladores/registrosControlador.js

const registrosModelo = require('../modelos/registrosModelo'); 

const crearRegistro = async (req, res) => {
  const datosRegistro = req.body;
  
  try {
    // ✅ MODIFICAR: Convertir el valor booleano a 1 o 0
    datosRegistro.estado_reg = datosRegistro.estado_reg ? 1 : 0; 

    // Ahora, el objeto datosRegistro tiene el valor correcto para la base de datos
    const resultado = await registrosModelo.crearRegistroDB(datosRegistro);
    
    res.status(201).json({
      mensaje: 'Registro creado con éxito',
      id_insertado: resultado.insertId,
      registro: datosRegistro,
    });
  } catch (error) {
    console.error('Error del servidor al crear registro:', error);
    
    res.status(500).json({
      mensaje: 'Error al crear el registro',
      error: error.message,
    });
  }
};

module.exports = {
  crearRegistro,
};