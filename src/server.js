require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testarConexao } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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