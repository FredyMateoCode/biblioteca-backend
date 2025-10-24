// probarDatosRuta.js
const express = require('express');
const router = express.Router();
// 🛑 1. Importar correctamente la función verificarRol
const verificarRol = require('../middlewares/autorizacion'); 

// 🛑 IMPORTAR EL NUEVO CONTROLADOR
const { registrarPuntaje } = require('../controladores/puntajeControlador.js'); 


/**
 * Define la ruta POST para recibir los datos de guardado del cuestionario.
 * La ruta ahora delega la lógica de negocio (guardar en DB) al controlador.
 */
// 🛑 USAR EL CONTROLADOR: 
// La solicitud pasa por verificarRol (middleware) y luego va a registrarPuntaje (controlador)
router.post('/guardar-puntaje', verificarRol(['estudiante']), registrarPuntaje);

module.exports = router;