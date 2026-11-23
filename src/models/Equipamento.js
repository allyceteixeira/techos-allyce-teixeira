class Equipamento {
    constructor({ id = null, clienteId, tipo, marca, modelo, numeroSerie = null, observacoes = null }) {
        this.id = id;
        this.clienteId = clienteId;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.numeroSerie = numeroSerie;
        this.observacoes = observacoes;
    }

    validar() {
        const erros = [];
        if (!this.clienteId) {
            erros.push('É obrigatório vincular um cliente ao equipamento.');
        }
        if (!this.tipo || !this.marca || !this.modelo) {
            erros.push('Tipo, marca e modelo são obrigatórios.');
        }
        return erros;
    }
}

module.exports = Equipamento;