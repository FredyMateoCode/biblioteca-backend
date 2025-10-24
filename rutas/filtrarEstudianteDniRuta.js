const express = require('express');
const router = express.Router();
//const verificarRol = require('../middlewares/autorizacion');

// Importamos el nuevo controlador
const { buscarEstudiantePorDni } = require('../controladores/filtrarEstudianteDniControlador.js');

// Definimos la nueva ruta para buscar por DNI
//router.get('/estudiantes/por-dni/:dni', verificarRol(['administrador', 'registrador', 'profesor', 'estudiante']), buscarEstudiantePorDni);
router.get('/estudiantes/por-dni/:dni', buscarEstudiantePorDni);
module.exports = router;