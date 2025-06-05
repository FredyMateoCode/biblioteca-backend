// Sección para la importación de dependencias en constantes
require ('dotenv').config();//Hacemos accecible las bariables de entorno ubicadas en .env
require('./configuracion/conexion'); // solo para probar la conexión al arrancar el servidor
const express = require ('express'); //Importamos la dependencia express para crear el servidor backend.
const app = express(); //Instancia para que el servidor maneje rutas y peticiones HTTP
const PORT = process.env.PORT || 5000; // Utilizará el puerto de render o el 5000




/*--------------------INICIO SECCIÓN DE PRUEBA - IMPORTACIONES ---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/*--------------------FIN SECCIÓN DE PRUEBA - IMPORTACIONES <<<<<<<<<<<<<<<<<<<<<-----------------*/





/*------ INICIO SECCIÓN DE PRUEBAS - USO DE RUTAS Y OTROS ------------------------------------->>>>>>>>>>>>>>*/

/*------ FIN SECCIÓN DE PRUEBAS - USO DE RUTAS Y OTROS <<<<<<<<<<<<<<<---------------------------------------*/




//Cofiguramos el servidor con un puerto específico:
app.get('/', (req, res) => {
	res.send('Servidor Funcionando 🚀 🖥');
});
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Servidor de la Biblioteca <<IEE Divina Pastora>> ejecutandose en el puerto ${PORT}`);
});