const { pool } = require('../config/database');
const Cliente = require('../models/Cliente');

class ClienteController {
    static async listar(req, res) {
        try {
            const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
            return res.json(rows);
        } catch (erro) {
            console.error('Erro ao listar clientes:', erro);
            return res.status(500).json({ erro: 'Erro interno ao buscar clientes.' });
        }
    }

    static async criar(req, res) {
        try {
            const cliente = new Cliente(req.body);
            const erros = cliente.validar();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            const [resultado] = await pool.query(
                `INSERT INTO clientes (nome, cpf_cnpj, telefone, email, endereco)
                 VALUES (?, ?, ?, ?, ?)`,
                [cliente.nome, cliente.cpfCnpj, cliente.telefone, cliente.email, cliente.endereco]
            );

            cliente.id = resultado.insertId;
            return res.status(201).json({
                mensagem: 'Cliente cadastrado com sucesso!',
                cliente
            });
        } catch (erro) {
            console.error('Erro ao criar cliente:', erro);
            if (erro.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ erro: 'Já existe um cliente com este CPF/CNPJ.' });
            }
            return res.status(500).json({ erro: 'Erro interno ao cadastrar cliente.' });
        }
    }
}

module.exports = ClienteController;