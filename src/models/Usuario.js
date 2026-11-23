class Usuario {
    constructor({ id = null, nome, email, senhaHash = null, perfil = 'TECNICO' }) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.perfil = perfil;
    }

    validar() {
        const erros = [];
        if (!this.nome || this.nome.trim().length < 2) {
            erros.push('Nome do utilizador é obrigatório.');
        }
        if (!this.email || !this.email.includes('@')) {
            erros.push('E-mail válido é obrigatório.');
        }
        if (!['ADMIN', 'TECNICO', 'ATENDENTE'].includes(this.perfil)) {
            erros.push('Perfil inválido.');
        }
        return erros;
    }
}

module.exports = Usuario;