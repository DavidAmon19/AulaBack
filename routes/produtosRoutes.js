const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

router.get('/cursos', produtoController.listar);
router.get('/cursos/:id', produtoController.buscarPorId);
router.post('/cursos', produtoController.criar);
router.patch('/cursos/:id', produtoController.atualizar);
router.delete('/cursos/:id', produtoController.deletar);

module.exports = router;
