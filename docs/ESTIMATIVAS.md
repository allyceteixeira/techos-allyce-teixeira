# Estimativas Técnicas — TechOS

| ID | User Story | Story Points | Sprint | Justificativa Técnica |
| :--- | :--- | :---: | :---: | :--- |
| US01 | Login e Autenticação JWT | 8 | Sprint 3 | Envolve hash bcrypt, geração/validação de token JWT e middleware de proteção de rotas. |
| US02 | Cadastro de Clientes | 3 | Sprint 3 | CRUD simples com validação de campos e persistência no MySQL. |
| US03 | Cadastro de Equipamentos | 3 | Sprint 3 | CRUD com chave estrangeira vinculada ao cliente. |
| US04 | Abrir Ordem de Serviço | 8 | Sprint 3/4 | Validação cruzada de cliente/equipamento, protocolo único e integridade transacional no MySQL. |
| US05 | Atualizar Status da OS | 5 | Sprint 3/4 | Controle de transição de estados (`ABERTA`, `EM_ANDAMENTO`, `CONCLUIDA`) e cálculo de valor. |
| US06 | Relatório e Dashboard de OS | 5 | Sprint 4 | Consultas agregadas no banco e renderização dinâmica de indicadores. |