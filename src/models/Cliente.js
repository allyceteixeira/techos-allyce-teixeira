class Cliente {
    constructor({ id = null, nome, cpfCnpj, telefone, email = null, endereco = null }) {
        this.id = id;
        this.nome = nome;
        this.cpfCnpj = cpfCnpj;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
    }

    validar() {
        const erros = [];
        if (!this.nome || this.nome.trim().length < 2) {
            erros.push('Nome do cliente é obrigatório.');
        }
        if (!this.cpfCnpj || this.cpfCnpj.trim().length < 11) {
            erros.push('CPF ou CNPJ é obrigatório.');
        }
        if (!this.telefone || this.telefone.trim().length < 8) {
            erros.push('Telefone de contacto é obrigatório.');
        }
        return erros;
    }
}

module.exports = Cliente;