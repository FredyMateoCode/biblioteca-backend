// middlewares/autorizacion.js
const jwt = require('jsonwebtoken');

// ✅ Este middleware ahora maneja tanto la autenticación como la autorización.
const verificarRol = (rolesPermitidos) => {
return (req, res, next) => {
      try {
            // 🛑 CORRECCIÓN: Leer el Header 'Authorization' (en minúsculas)
            const authHeader = req.header('Authorization');
        
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send('Acceso Denegado. Formato o token no proporcionado.');
            }
      
      // 🛑 EXTRAER TOKEN: Cortar "Bearer " (7 caracteres: 6 de Bearer + 1 espacio)
            const token = authHeader.substring(7);
                        // Si no hay token después del corte (token vacío)
            if (!token) {
            return res.status(401).send('Acceso Denegado. Token no proporcionado después del prefijo Bearer.');
            }
                        const verificado = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = verificado; // ✅ Guarda la información del usuario del token
                        // ... (La verificación de rol se mantiene igual)

            if (!req.usuario || !req.usuario.rol || !rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).send('Acceso Prohibido. No tiene el rol necesario.');
            }

            next(); // Continúa si el token y el rol son válidos

      } catch (error) {
            // Maneja errores de token inválido o expirado
            res.status(400).send('Token inválido.');
      }
};
};

module.exports = verificarRol;