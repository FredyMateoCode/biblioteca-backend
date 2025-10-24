// rutas/mostrarPreguntasRuta.js

const express = require('express');
const router = express.Router();
// Asumo que tu middleware de autorización está aquí:
//const verificarRol = require('../middlewares/autorizacion.js'); 

// Importamos el controlador de preguntas
const { mostrarPreguntas } = require('../controladores/mostrarPreguntasControlador.js');


/*
 * Ruta GET para obtener todas las preguntas de un cuestionario.
 * Se protege con el middleware de roles.
 */
/*router.get(
    '/cuestionario/preguntas', 
    verificarRol(['administrador', 'profesor', 'estudiante']), 
    mostrarPreguntas
);*/

router.get(
    '/cuestionario/:idCuest/preguntas', 
    mostrarPreguntas
);


// Exportamos el router para que pueda ser utilizado en app.js
module.exports = router;