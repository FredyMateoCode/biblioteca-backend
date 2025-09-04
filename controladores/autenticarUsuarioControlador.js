// controladores/loginControlador.js su función principal es validad los datos enviados desde el frontend:
const autenticarUsuarioModelo = require('../modelos/autenticarUsuarioModelo'); // Importa el modelo
const bcrypt = require('bcryptjs'); // Para comparar contraseñas
const jwt = require('jsonwebtoken'); // 1. ✅ Importa jsonwebtoken

//Definimos y exportamos la función principal para que pueda ser utilizado en otros archivos del proyecto
//async indica que es una fucnión asincrona que espera que otras consultras se ejecuten: (ESPERA)
exports.verificarCredenciales = async (req, res) => {
    // Extrae el usuario y la contraseña del cuerpo de la solicitud (req.body) enviado del frontend
    const { usuario, password } = req.body;
    
    //Manejamos los posibles error con try
    try {
        // Usa el modelo para buscar el usuario en la base de datos
        const validarUsuario = await autenticarUsuarioModelo.obtenerUsuarioPorNombre(usuario);

        // Si el usuario no existe
        if (!validarUsuario) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        // Compara la contraseña enviada con la contraseña encriptada de la base de datos
        const passwordMatch = await bcrypt.compare(password, validarUsuario.password_us);

        // Si la contraseña no coincide
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        // 2. ✅ Generamos el token JWT
        // Asegúrate de que el campo 'rol' exista en tu base de datos y se recupere en el modelo
        const token = jwt.sign(
            { id: validarUsuario.id_us, usuario: validarUsuario.usuario_us, rol: validarUsuario.rol_nombre },
            process.env.JWT_SECRET, // Usa una clave secreta segura desde tu archivo .env
            { expiresIn: '1h' } // El token expira en 1 hora
        );


        // 3. ✅ Enviamos el token en la respuesta
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token, rol: validarUsuario.rol_nombre });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};