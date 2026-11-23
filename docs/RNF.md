# Requisitos Não Funcionais (RNF) — TechOS

- **RNF01 [Desempenho]:** Endpoints da API devem responder em até 250ms sob 50 requisições simultâneas.
- **RNF02 [Segurança - OWASP]:** Senhas armazenadas com hash bcrypt/password_hash (custo >= 10).
- **RNF03 [Segurança - JWT]:** Rotas privadas exigem token Bearer JWT com expiração de 8 horas.
- **RNF04 [Acessibilidade - WCAG 2.1]:** Contraste mínimo de 4.5:1 e navegação completa via teclado.
- **RNF05 [Compatibilidade]:** Layout responsivo de 375px a 1920px sem rolagem horizontal.
- **RNF06 [Confiabilidade]:** Integridade referencial com chaves estrangeiras e transações no MySQL.
- **RNF07 [Manutenibilidade]:** Arquitetura MVC com separação clara entre modelos, controladores, rotas e views.
- **RNF08 [Portabilidade]:** Configurações sensíveis isoladas em variáveis de ambiente (`.env`).