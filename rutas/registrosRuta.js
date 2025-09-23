const express = require('express');
const router = express.Router();
const registrosControlador = require('../controladores/registrosControlador'); // ✅ Importa tu controlador

// ✅ Define la ruta POST para crear un registro
router.post('/', registrosControlador.crearRegistro);

module.exports = router;