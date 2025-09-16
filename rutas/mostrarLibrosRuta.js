/*Creamos la ruta para mostrar los datos obtenidmos mediante la consulta del modelo, de forma modularizada.
• Primermo importamos express para usar y gestionar el sistema de rutas:*/
const express = require ('express');
const router = express.Router(); // Renombramos a 'router' para mayor claridad
const verificarRol = require('../middlewares/autorizacion');

// Importamos el controlador
const { mostrarLibros } = require ('../controladores/mostrarLibrosControlador.js');


/*Definimos una ruta de tipo Get que obtiene los datos desde la DB
• Añadimos el middleware 'autenticacion' para proteger la ruta*/
//router.get('/usuariosBiblioteca', verificarRol(['administrador', 'registrador', 'profesor', 'estudiante']), mostrarUsuarios);
router.get('/librosBiblioteca', verificarRol(['administrador', 'registrador', 'profesor', 'estudiante']), mostrarLibros);
//router.get('/librosBiblioteca', mostrarLibros);
//Exportamos el router para poder acceder desde otros lugares del proyecto.
module.exports = router;