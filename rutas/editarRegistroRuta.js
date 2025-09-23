const express = require('express');
const router = express.Router();
const { editarRegistroControlador } = require('../controladores/editarRegistroControlador.js');

router.put('/:id', editarRegistroControlador);

module.exports = router;