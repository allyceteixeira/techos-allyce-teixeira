const { pool } = require('../config/database');
const OrdemServico = require('../models/OrdemServico');

class OrdemServicoController {
    static async listar(req, res) {
        try {
            const { status } = req.query;
            const parametros = [];
            let sql = `
                SELECT os.*,
                       c.nome AS cliente_nome,
                       e.tipo AS equipamento_tipo,
                       e.marca AS equipamento_marca,
                       e.modelo AS equipamento_modelo
                FROM ordens_servico os
                INNER JOIN clientes c ON os.cliente_id = c.id
                INNER JOIN equipamentos e ON os.equipamento_id = e.id
            `;

            if (status) {
                if (!OrdemServico.STATUS_VALIDOS.includes(status)) {
                    return res.status(400).json({ erro: 'Status da OS inválido.' });
                }
                sql += ' WHERE os.status = ?';
                parametros.push(status);
            }

            sql += ' ORDER BY os.id DESC';

            const [rows] = await pool.query(sql, parametros);
            return res.json(rows);
        } catch (erro) {
            console.error('Erro ao listar ordens de serviço:', erro);
            return res.status(500).json({ erro: 'Erro interno ao buscar ordens de serviço.' });
        }
    }

    static async buscarPorProtocolo(req, res) {
        try {
            const { codigo } = req.params;
            const [rows] = await pool.query(
                `
                SELECT os.*,
                       c.nome AS cliente_nome,
                       c.telefone AS cliente_telefone,
                       e.tipo AS equipamento_tipo,
                       e.marca AS equipamento_marca,
                       e.modelo AS equipamento_modelo
                FROM ordens_servico os
                INNER JOIN clientes c ON os.cliente_id = c.id
                INNER JOIN equipamentos e ON os.equipamento_id = e.id
                WHERE os.protocolo = ?
                `,
                [codigo]
            );

            if (rows.length === 0) {
                return res.status(404).json({ erro: 'Ordem de serviço não encontrada para este protocolo.' });
            }

            return res.json(rows[0]);
        } catch (erro) {
            console.error('Erro ao buscar OS por protocolo:', erro);
            return res.status(500).json({ erro: 'Erro interno ao buscar ordem de serviço.' });
        }
    }

    static async criar(req, res) {
        try {
            const os = new OrdemServico(req.body);
            const erros = os.validar();

            if (erros.length > 0) {
                return res.status(400).json({ erros });
            }

            const [resultado] = await pool.query(
                `INSERT INTO ordens_servico
                 (protocolo, cliente_id, equipamento_id, tecnico_id, relato_defeito, laudo_tecnico, status, valor_servico)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    os.protocolo,
                    os.clienteId,
                    os.equipamentoId,
                    os.tecnicoId,
                    os.relatoDefeito,
                    os.laudoTecnico,
                    os.status,
                    os.valorServico
                ]
            );

            os.id = resultado.insertId;
            return res.status(201).json({
                mensagem: 'Ordem de serviço aberta com sucesso!',
                ordemServico: os
            });
        } catch (erro) {
            console.error('Erro ao criar ordem de serviço:', erro);
            if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ erro: 'Cliente, equipamento ou técnico informado não existe.' });
            }
            return res.status(500).json({ erro: 'Erro interno ao abrir ordem de serviço.' });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { status, laudoTecnico, tecnicoId, valorServico } = req.body;

            const [rows] = await pool.query('SELECT * FROM ordens_servico WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ erro: 'Ordem de serviço não encontrada.' });
            }

            const atual = rows[0];

            if (status && !OrdemServico.STATUS_VALIDOS.includes(status)) {
                return res.status(400).json({ erro: 'Status da OS inválido.' });
            }

            const novoStatus = status || atual.status;
            const novoLaudo = laudoTecnico !== undefined ? laudoTecnico : atual.laudo_tecnico;
            const novoTecnico = tecnicoId !== undefined ? tecnicoId : atual.tecnico_id;
            const novoValor = valorServico !== undefined ? Number(valorServico) : Number(atual.valor_servico);

            if (novoValor < 0) {
                return res.status(400).json({ erro: 'Valor do serviço não pode ser negativo.' });
            }

            await pool.query(
                `UPDATE ordens_servico
                 SET status = ?, laudo_tecnico = ?, tecnico_id = ?, valor_servico = ?
                 WHERE id = ?`,
                [novoStatus, novoLaudo, novoTecnico, novoValor, id]
            );

            return res.json({
                mensagem: 'Ordem de serviço atualizada com sucesso!',
                ordemServico: {
                    id: Number(id),
                    protocolo: atual.protocolo,
                    status: novoStatus,
                    laudoTecnico: novoLaudo,
                    tecnicoId: novoTecnico,
                    valorServico: novoValor
                }
            });
        } catch (erro) {
            console.error('Erro ao atualizar ordem de serviço:', erro);
            if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({ erro: 'Técnico informado não existe.' });
            }
            return res.status(500).json({ erro: 'Erro interno ao atualizar ordem de serviço.' });
        }
    }
}

module.exports = OrdemServicoController;