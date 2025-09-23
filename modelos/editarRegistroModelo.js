// Importa la configuración de la base de datos
const pool = require('../configuracion/conexion.js');
// Importa dayjs para manejar el formato de la fecha
const dayjs = require('dayjs');

const editarRegistroModelo = {
  // Ahora la función `actualizar` recibe los datos y un callback
  actualizar: (id, datosActualizados, callback) => {
    // ✅ Formatea la fecha de registro antes de la consulta
    const fechaActualizada = dayjs().format('YYYY-MM-DD HH:mm:ss');
    
    // ✅ Asegúrate de no mutar el objeto original, crea uno nuevo
    const datosFinales = {
      ...datosActualizados,
      fecha_reg: fechaActualizada,
    };
    
    // La consulta se mantiene igual, pero los datos ya están formateados
    pool.query('UPDATE registros SET ? WHERE id_reg = ?', [
      datosFinales,
      id,
    ], (error, resultado) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, resultado);
    });
  },
};

module.exports = editarRegistroModelo;