const crypto = require('crypto');
const { pool } = require('../config/database');
const Usuario = require('../models/Usuario');

class UsuarioController {
    static gerarHashSenha(senha) {
        return crypto.createHash('sha256').update(senha).digest('hex');
    }

    static async listar(req, res) {
        try {
            const [rows] = await pool.query(
                'SELECT id, nome, email, perfil, criado_em FROM usuarios ORDER BY id DESC'
            );
            return res.json(rows);
        } catch (erro) {
            console.error('Erro ao listar utilizadores:', erro);
            return res.status(500).json({ erro: 'Erro interno ao buscar utilizadores.' });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, email, senha, perfil } = req.body;

            if (!senha || String(senha).length < 4) {
                return res.status(400).json({ erro: 'A senha deve ter pelo menos 4 caracteres.' });
            }

            const senhaHash = UsuarioController.gerarHashSenha(String(senha));
            const usuario = new Usuario({ nome, email, senhaHash, perfil });
            const erros = usuario.validar();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            const [resultado] = await pool.query(
                `INSERT INTO usuarios (nome, email, senha_hash, perfil)
                 VALUES (?, ?, ?, ?)`,
                [usuario.nome, usuario.email, usuario.senhaHash, usuario.perfil]
            );

            return res.status(201).json({
                mensagem: 'Utilizador cadastrado com sucesso!',
                usuario: {
                    id: resultado.insertId,
                    nome: usuario.nome,
                    email: usuario.email,
                    perfil: usuario.perfil
                }
            });
        } catch (erro) {
            console.error('Erro ao criar utilizador:', erro);
            if (erro.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ erro: 'Já existe um utilizador com este e-mail.' });
            }
            return res.status(500).json({ erro: 'Erro interno ao cadastrar utilizador.' });
        }
    }
}

module.exports = UsuarioController;