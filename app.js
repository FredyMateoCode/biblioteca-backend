// 1. IMPRTACIÓN DE LAS DEPENDENCIAS DENTRO DE CONSTANTES PARA EL USO POSTERIOR:
// (SERVIDOR) = Línea de código exclusivo para la configuración del SERVIDOR.
require ('dotenv').config();//Hacemos accecible las bariables de entorno ubicadas en .env (SERVIDOR).
require('./configuracion/conexion'); // solo para probar la conexión al arrancar el servidor.
const express = require ('express'); //Para crear el servidor backend (SERVIDOR).
const app = express(); //Instancia para que el servidor maneje rutas y peticiones HTTP (SERVIDOR).
const PORT = process.env.PORT || 4000; // Utilizará el puerto asignado por render ó el puerto local 5000 (SERVIDOR).

/*Importación de rutas comprobadas para servir - Inicio*/

/*Importación de rutas comprobadas para servir - Fin*/


/* Rutas servidas - Inicio*/

/* Rutas Servidas - Fin*/



/*-------------------- SECCIÓN DE PRUEBA - IMPORTACIONES - INICIO---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
const mostrarUsuariosRuta = require ('./rutas/mostrarUsuariosRuta.js');//Importamos la ruta dentro de una constante.
/*-------------------- SECCIÓN DE PRUEBA - IMPORTACIONES - FIN <<<<<<<<<<<<<<<<<<<<<-----------------*/


/*------ INICIO SECCIÓN DE PRUEBAS - USO DE RUTAS Y OTROS ------------------------------------->>>>>>>>>>>>>>*/
app.use('/mostrarUsuarios', mostrarUsuariosRuta);
/*------ FIN SECCIÓN DE PRUEBAS - USO DE RUTAS Y OTROS <<<<<<<<<<<<<<<---------------------------------------*/


//Netamente configuración del servidor con puerto dinámico para render y un puerto específico local: (SERVIDOR).
app.get('/', (req, res) => {
	res.send('Servidor Funcionando 2025 🚀🖥');
});
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Servidor de la Biblioteca 2025 <<IEE Divina Pastora>> ejecutandose en el puerto ${PORT}`);
});