# Sistema TechOS — Gestão de Ordens de Serviço (TechServices)

Projeto desenvolvido individualmente na Unidade Curricular de **Desenvolvimento de Sistemas** (200h / 40 Encontros).

- **Aluna:** Allyce Teixeira
- **Instituição:** SENAI Pernambuco — Unidade Belo Jardim
- **Curso:** Técnico em Desenvolvimento de Sistemas
- **Docente Responsável:** Ryan Oliveira
- **Stack Tecnológica:** VS Code, Git, GitHub, HTML5, CSS3, JavaScript, Node.js, PHP, XAMPP e MySQL Workbench.

## Arquitetura do Sistema
O TechOS segue o modelo cliente-servidor desacoplado em 3 camadas:
1. **Frontend (Cliente):** Interface web responsiva em HTML5, CSS3 e JavaScript comunicando-se via requisições HTTP/JSON assíncronas (`fetch`).
2. **Backend (API REST):** Servidor Node.js + Express estruturado em arquitetura MVC, responsável pelas regras de negócio e autenticação JWT.
3. **Banco de Dados:** MySQL Server (via XAMPP, porta `3306`) para persistência relacional de usuários, clientes, equipamentos e ordens de serviço.

*(Diagrama detalhado disponível em `docs/arquitetura-techos.png`)*