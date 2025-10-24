// rutas/evaluarCuestionarioRuta.js

const express = require('express');
const router = express.Router();
//const verificarRol = require('../middlewares/autorizacion.js'); // Usamos el middleware por seguridad

const { evaluarCuestionario } = require('../controladores/evaluarCuestionarioControlador.js');


/*
 * Ruta POST para evaluar las respuestas del estudiante y devolver el puntaje.
 * Requiere autenticación para asegurar que solo usuarios válidos puedan enviar resultados.
 */
/*router.post(
    '/cuestionario/evaluar', 
    verificarRol(['administrador', 'profesor', 'estudiante']), 
    evaluarCuestionario
);
*/

router.post(
    '/cuestionario/evaluar', 
    evaluarCuestionario
);

module.exports = router;