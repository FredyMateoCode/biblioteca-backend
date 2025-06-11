//Importamos la funcion obtenerUsuarioModelo.
const {obtenerUsuarios} = require('../modelos/mostrarUsuariosModelo.js');
/*Definimos el controlador de express: En controladores/mostrarUsuariosCOntrolador.js
para obtener los datos de la base de datos y enviarlos al frontend en formato Json.
• Los controladores administran las solicitudes GET, POST y otros:
• req = requerimiento HTTP desde el frontend.
• res = respuesta HTTP del servidor se enviará al frontend.
• err = maneja los errores
• return = utilizado para que el código siga ejecutandose.*/
const mostrarUsuarios = (req, res) =>{
	obtenerUsuarios((err, resultados)=>{
		if(err){
			return res.status(500).json({error: 'Hubo un error al obtener los usuarios'});
		}
		/*De no existir error se renderiza los resultados en formato json para ser mostrados en el frontend.*/
		res.json(resultados);
		/*Mostrar los datos en consola no es recomendable ya que podría exponer datos*/
		console.log('Usuarios Obtenidos', resultados);
	});
};

//Exportamos la función mostrar usuarios para que pueda ser accecible desde otros componentes del proyecto.
module.exports = { mostrarUsuarios };
