// 1. IMPRTACIÓN DE LAS DEPENDENCIAS DENTRO DE CONSTANTES PARA EL USO POSTERIOR:
// (SERVIDOR) = Línea de código exclusivo para la configuración del SERVIDOR.
require ('dotenv').config();//Hacemos accecible las bariables de entorno ubicadas en .env (SERVIDOR).
require('./configuracion/conexion'); // solo para probar la conexión al arrancar el servidor.//(DATOS)
const express = require ('express'); //Para crear el servidor backend (SERVIDOR).
const app = express(); //Instancia para que el servidor maneje rutas y peticiones HTTP (SERVIDOR).
const PORT = process.env.PORT || 4000; // Utilizará el puerto asignado por render ó el puerto local 5000 (SERVIDOR).
const cors = require('cors'); // Importa el paquete 'cors'

//Middlewares
// Habilita CORS para todas las solicitudes
app.use(cors());

// Middleware para que Express pueda leer cuerpos de solicitud en formato JSON(Uso con metodos POST y GET)
app.use(express.json());

/*Importación de rutas comprobadas para servir - Inicio*/
//Importamos la ruta dentro de una constante.
const mostrarUsuariosRuta = require ('./rutas/mostrarUsuariosRuta.js');//(DATOS)
const autenticarUsuarioRuta = require('./rutas/autenticarUsuarioRuta'); //Para Logear
/*Importación de rutas comprobadas para servir - Fin*/


/*-------------------- SECCIÓN DE PRUEBA - IMPORTACIONES - INICIO---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
const mostrarLibrosRuta = require ('./rutas/mostrarLibrosRuta.js');//(DATOS)
/*-------------------- SECCIÓN DE PRUEBA - IMPORTACIONES - FIN <<<<<<<<<<<<<<<<<<<<<-----------------*/


/* Rutas servidas Comprobadas- Inicio*/
app.use('/mostrarUsuarios', mostrarUsuariosRuta); //localhost:4000/mostrarUsuarios/usuariosBiblioteca-(DATOS)
app.use('/autenticarUsuarios', autenticarUsuarioRuta);//Para el login
/* Rutas Servidas Comprobadas - Fin*/


/*------ INICIO SECCIÓN DE PRUEBAS - USO DE RUTAS Y OTROS ------------------------------------->>>>>>>>>>>>>>*/
app.use('/mostrarLibros', mostrarLibrosRuta); //localhost:4000/mostrarLibros/librosBiblioteca-(DATOS)
/*------ FIN SECCIÓN DE PRUEBAS - USO DE RUTAS Y OTROS <<<<<<<<<<<<<<<---------------------------------------*/


//Netamente configuración del servidor con puerto dinámico para render y un puerto específico local: (SERVIDOR).
app.get('/', (req, res) => {
	res.send('Servidor Funcionando 2025 🚀🖥');
});
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Servidor de la Biblioteca 2025 <<IEE Divina Pastora>> ejecutandose en el puerto ${PORT}`);
});