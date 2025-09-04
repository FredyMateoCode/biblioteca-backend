// rutas/autenticarUsuarioRuta.js
const express = require('express');
const router = express.Router();
const autenticarUsuarioControlador = require('../controladores/autenticarUsuarioControlador'); // Importamos el controlador

// Pasar la función de login del controlador
router.post('/', autenticarUsuarioControlador.verificarCredenciales); // Llamamos a la función "login"

module.exports = router;