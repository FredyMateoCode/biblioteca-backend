const { obtenerRespuestasCorrectas } = require('../modelos/evaluarCuestionarioModelo.js');

/*
 * Controlador de Express para recibir las respuestas del estudiante,
 * evaluarlas contra las respuestas correctas de la BD y calcular el puntaje.
 */
const evaluarCuestionario = (req, res) => {
    
    const respuestasEstudiante = req.body.respuestas || [];
    const idCuestionario = req.body.idCuestionario; 

    // 1. Obtener las respuestas correctas del Modelo
    obtenerRespuestasCorrectas(idCuestionario, (err, respuestasCorrectasBD) => {
        if (!idCuestionario || !Array.isArray(respuestasEstudiante)) {
         console.error('ERROR: Datos de evaluación incompletos o incorrectos.', { idCuestionario, respuestasTipo: typeof respuestasEstudiante });
         return res.status(400).json({ error: 'Datos de evaluación incompletos o incorrectos. Se requiere idCuestionario y un array de respuestas.' });
        }

        let puntajeObtenido = 0;
        let puntajeMaximo = 0;
        
        // 2. Mapear las respuestas de la BD para fácil acceso y asegurar el tipo de dato
        const mapaRespuestasCorrectas = respuestasCorrectasBD.reduce((mapa, r) => {
            // 🛑 CORRECCIÓN CLAVE 1: Estandarizamos el ID de pregunta a STRING para usarlo como CLAVE de objeto JS.
            const clavePregunta = String(r.id_preg); 

            mapa[clavePregunta] = {
                // Estandarizamos el ID de opción correcta a NUMBER
                id_opcion_correcta: Number(r.id_opcion_correcta),
                puntuacion: parseFloat(r.puntuacion_preg)
            };
            puntajeMaximo += parseFloat(r.puntuacion_preg);
            return mapa;
        }, {});

        // 3. Comparar las respuestas del estudiante con las correctas
        respuestasEstudiante.forEach(respuesta => {
            
            // 🛑 CORRECCIÓN CLAVE 2: Estandarizamos el ID de pregunta de la respuesta a STRING para la búsqueda.
            const claveBusqueda = String(respuesta.id_preg); 

            // Buscamos la información correcta para la pregunta actual
            const infoCorrecta = mapaRespuestasCorrectas[claveBusqueda]; 
            
            if (infoCorrecta) {
                // Estandarizamos el ID de opción seleccionado a NUMBER para la comparación
                const idSeleccionadoEstudiante = Number(respuesta.id_opcion_seleccionada);
                
                // --- LOG DE DEPURACIÓN CRUCIAL (se puede remover tras la prueba) ---
                console.log(`\n=== P${respuesta.id_preg} ===`);
                console.log(`Estudiante: ${idSeleccionadoEstudiante} (Tipo: ${typeof idSeleccionadoEstudiante})`);
                console.log(`Correcta BD: ${infoCorrecta.id_opcion_correcta} (Tipo: ${typeof infoCorrecta.id_opcion_correcta})`);
                console.log(`Puntuación a sumar: ${infoCorrecta.puntuacion}`);
                console.log(`Resultado de la comparación: ${idSeleccionadoEstudiante === infoCorrecta.id_opcion_correcta}`);
                console.log(`=== FIN COMPARACIÓN ===\n`);
                // --------------------------------------------------------------------
                
                // La comparación estricta de NUMBER ahora es segura.
                if (idSeleccionadoEstudiante === infoCorrecta.id_opcion_correcta) {
                    // La respuesta del estudiante coincide con la correcta
                    puntajeObtenido += infoCorrecta.puntuacion;
                }
            }
        });

        // 4. Devolver el resultado al Frontend
        res.json({
            mensaje: 'Cuestionario evaluado con éxito.',
            puntaje_obtenido: parseFloat(puntajeObtenido.toFixed(2)), // Redondear a 2 decimales
            puntaje_maximo: parseFloat(puntajeMaximo.toFixed(2))
        });
    });
};

module.exports = { evaluarCuestionario };