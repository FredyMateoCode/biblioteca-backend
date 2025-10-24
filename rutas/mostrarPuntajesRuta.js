// rutas/mostrarPuntajesRuta.js

/*
 * Creamos la ruta para mostrar los datos de puntajes obtenidos mediante la consulta del modelo,
 * de forma modularizada y protegida.
 */
const express = require ('express');
const router = express.Router(); // Renombramos a 'router' para mayor claridad

// Middleware de autenticación y autorización (asumimos que está en ../middlewares/autorizacion)
const verificarRol = require('../middlewares/autorizacion');

// Importamos el controlador de puntajes
const { mostrarPuntajes } = require ('../controladores/mostrarPuntajesControlador.js'); 


/*
 * Definimos una ruta de tipo GET que obtiene los puntajes del estudiante.
 *
 * Endpoint: /puntajes/:dni
 * La ruta está protegida por el middleware de autorización.
 */
router.get('/puntajes/:dni', verificarRol(['administrador', 'profesor', 'estudiante']), mostrarPuntajes);
//router.get('/puntajes/:dni', mostrarPuntajes);

// Exportamos el router para poder acceder desde otros lugares del proyecto.
module.exports = router;