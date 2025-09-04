// middlewares/autorizacion.js
const jwt = require('jsonwebtoken');

// ✅ Este middleware ahora maneja tanto la autenticación como la autorización.
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const token = req.header('auth-token');
      if (!token) {
        return res.status(401).send('Acceso Denegado. No se proporcionó un token.');
      }
      
      const verificado = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = verificado; // ✅ Guarda la información del usuario del token
      
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