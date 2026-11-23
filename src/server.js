require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testarConexao } = require('./config/database');

const clienteRoutes = require('./routes/clienteRoutes');
const ordemServicoRoutes = require('./routes/ordemServicoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
// const equipamentoRoutes = require('./routes/equipamentoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/ordens-servico', ordemServicoRoutes);

app.use('/api/usuarios', usuarioRoutes);
// app.use('/api/equipamentos', equipamentoRoutes);

app.get('/api/status', (req, res) => {
    res.json({
        sistema: 'TechOS API',
        status: 'online',
        desenvolvedora: 'Allyce Teixeira',
        instituicao: 'SENAI Belo Jardim'
    });
});

app.listen(PORT, async () => {
    console.log(`Servidor TechOS rodando em http://localhost:${PORT}`);
    await testarConexao();
});