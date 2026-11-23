require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'techos_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testarConexao() {
    try {
        const conexao = await pool.getConnection();
        console.log('Conexão com MySQL (techos_db) estabelecida com sucesso!');
        conexao.release();
    } catch (erro) {
        console.error('Erro ao conectar ao MySQL:', erro.message);
    }
}

module.exports = {
    pool,
    testarConexao
};