const express = require('express');
const router = express.Router();
const OrdemServicoController = require('../controllers/OrdemServicoController');

router.get('/', OrdemServicoController.listar);
router.get('/protocolo/:codigo', OrdemServicoController.buscarPorProtocolo);
router.post('/', OrdemServicoController.criar);
router.patch('/:id', OrdemServicoController.atualizar);

module.exports = router;
