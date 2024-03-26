const { getCatalogoById } = require('./catalogo.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/:id', checkToken, getCatalogoById);

module.exports = router;