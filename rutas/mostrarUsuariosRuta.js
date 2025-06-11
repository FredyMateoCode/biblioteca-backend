/*Creamos la ruta para mostrar los datos obtenidmos mediante la consulta del modelo, de forma modularizada.
• Primermo importamos express para usar y gestionar el sistema de rutas:*/

const express = require ('express');

//Dentro de una constante importamos la función mostrarUsuarios desde el controlador.
const { mostrarUsuarios } = require ('../controladores/mostrarUsuariosControlador.js');

//Creamos el objeto que gestionará las rutas (ENRUTADOR) con una finalidad específica:
const ruta = express.Router();

/*Definimos una ruta según la finalidad, en este caso es una ruta de tipo Get que obtiene los datos desde la DB
• URL para acceder a la ruta '/usuarios2025' y mostrarUsuarios_es la función que se ejecutará al acceder a 
a la ruta*/
ruta.get('/usuariosBiblioteca', mostrarUsuarios);

//Exportamos la función para poder acceder desde otros lugares del proyecto.
module.exports = ruta;