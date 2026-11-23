class OrdemServico {
    static STATUS_VALIDOS = ['ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'];

    constructor({
        id = null,
        protocolo = null,
        clienteId,
        equipamentoId,
        tecnicoId = null,
        relatoDefeito,
        laudoTecnico = null,
        status = 'ABERTA',
        valorServico = 0.00
    }) {
        this.id = id;
        this.protocolo = protocolo || OrdemServico.gerarProtocolo();
        this.clienteId = clienteId;
        this.equipamentoId = equipamentoId;
        this.tecnicoId = tecnicoId;
        this.relatoDefeito = relatoDefeito;
        this.laudoTecnico = laudoTecnico;
        this.status = status;
        this.valorServico = Number(valorServico) || 0.00;
    }

    static gerarProtocolo() {
        const agora = new Date();
        const ano = agora.getFullYear();
        const aleatorio = Math.floor(1000 + Math.random() * 9000);
        return `OS-${ano}-${aleatorio}`;
    }

    alterarStatus(novoStatus) {
        if (!OrdemServico.STATUS_VALIDOS.includes(novoStatus)) {
            throw new Error(`Status inválido: ${novoStatus}`);
        }
        this.status = novoStatus;
    }

    validar() {
        const erros = [];
        if (!this.clienteId) {
            erros.push('Cliente é obrigatório para abrir a OS.');
        }
        if (!this.equipamentoId) {
            erros.push('Equipamento é obrigatório para abrir a OS.');
        }
        if (!this.relatoDefeito || this.relatoDefeito.trim().length < 5) {
            erros.push('Relato do defeito é obrigatório.');
        }
        if (!OrdemServico.STATUS_VALIDOS.includes(this.status)) {
            erros.push('Status da OS inválido.');
        }
        if (this.valorServico < 0) {
            erros.push('Valor do serviço não pode ser negativo.');
        }
        return erros;
    }
}

module.exports = OrdemServico;