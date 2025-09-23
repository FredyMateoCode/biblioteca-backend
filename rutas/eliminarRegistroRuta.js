// Antes: import { Router } from 'express';
// Antes: import { eliminar } from '../controladores/eliminarRegistroControlador.js';

const express = require('express');
const router = express.Router();
const { eliminar } = require('../controladores/eliminarRegistroControlador.js');

router.delete('/eliminarRegistro/registrosBiblioteca/:id', eliminar);

// Antes: export default router;
module.exports = router;