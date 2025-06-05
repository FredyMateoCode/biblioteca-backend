//Configuración/conexión.js
require ('dotenv').config(); // Para el manejo de variables de entorno y hacerlas accecibles

const mysql = require('mysql2'); // Importamos la libreria para el manejo de la base de datos.

// Creamos la conexión. 
const conexion = mysql.createConnection({
	host: process.env.MYSQLHOST, //
	user: process.env.MYSQLUSER, // 
	password: process.env.MYSQLPASSWORD, //
	database: process.env.MYSQLDATABASE, //
	port: process.env.MYSQLPORT //
});

//Utilizamos la conexión:
conexion.connect((error) => {
	if(error){
		console.error('❌ Erro de conexión a la base de datos de la Biblioteca:', error);
	} else {
		console.log('✅ Conexión exitosa a la Base de Datos de la Biblioteca');
	}
});

module.exports = conexion; //Exportamos la conexión
