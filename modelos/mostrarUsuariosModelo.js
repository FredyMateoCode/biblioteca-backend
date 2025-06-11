//Importamos la conexión para poder acceder a la base de datos:
const conexion = require('../configuracion/conexion.js');

/*Declaramos la función para obtener los datos con un método Callback (argumentos -> err o res),
con la finalidad de obtener todos los datos de la base datos y mostrarlos, en caso de dar error
tambien nos mostrara*/
const obtenerUsuarios = (callback) => {
	//Creamos la consulta dentro de una CONSTANTE el cual contenga todos los usuarios de la tabla usuarios.
	const consulta = 'SELECT * FROM usuarios where dni_us = 47576696';
	/*
	• Ejecutamos la consulta y hacemos un callback:
	• El callback maneja los errores y los resultados mediante dos parametros.
	• conexion.query metodo de mysql para realizar las consultas en la db.
	• El parámetro consulta contiene toda la consulta (puede tener otro nombre).
	 */
	conexion.query(consulta, (err, resultados) => {
		if(err){
			/*Si existe un error lo devuelve en el primer argumento y el segundo sera considerado nulo*/
			return callback(err, null);
		}
			/*Si se obtiene resultados entonces el primer argumento sera nulo y el segundo mostrara los 
			resultados*/
			callback(null, resultados);
	});

};

//Exportamos la funcion ObtenrUsuarios para que se pueda utilizar en el resto del proyecto.
module.exports = { obtenerUsuarios };