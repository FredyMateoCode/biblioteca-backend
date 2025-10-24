// rutas/cuestionarioRutas.js (Fragmento)

const express = require('express');
const router = express.Router();
// Asume que también tienes otros controladores importados aquí

// Importar el controlador
const { listarCuestionarios } = require('../controladores/listarCuestionariosControlador.js');

// La ruta para obtener la lista de todos los cuestionarios
// Maneja la URL /cuestionarios?dni=...
router.get('/cuestionarios', listarCuestionarios); 

// ... (Incluye aquí las rutas /cuestionario/:id/preguntas y /cuestionario/evaluar) ...

module.exports = router;

