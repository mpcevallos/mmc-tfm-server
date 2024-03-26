const { createCita, getCitaByUsuario } = require('./cita.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/', checkToken, createCita);
router.get('/:id', checkToken, getCitaByUsuario);

module.exports = router;