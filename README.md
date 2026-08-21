Boilerplate API — Migração SQLite → PostgreSQL
Documentação
https://app.notion.com/p/Boilerplate-de-API-REST-Arquitetura-em-Camadas-Fastify-TypeScript-3c238d9e04fe8039b148c30ab160cd3d?source=copy_link
A documentação completa do processo de migração, decisões técnicas e arquitetura está disponível no Notion.

Sobre este projeto

Este projeto nasceu como um boilerplate para desenvolvimento de APIs REST, originalmente estruturado com SQLite e SQL puro.

Durante a evolução do projeto, foi feita a migração do banco de dados de SQLite para PostgreSQL, utilizando Prisma como camada de acesso a dados.

Por que migrar?

O SQLite é excelente para prototipagem rápida e ambientes simples, mas apresenta limitações à medida que o projeto cresce:

Concorrência

SQLite lida mal com múltiplas conexões simultâneas de escrita, o que pode se tornar um gargalo em APIs com maior tráfego.

Escalabilidade

PostgreSQL é preparado para rodar em produção com múltiplos usuários, réplicas e volumes maiores de dados.

Recursos avançados

O PostgreSQL oferece recursos mais avançados, como:

Tipos de dados mais ricos
Constraints mais robustas
Extensões
Full-text search
JSONB
Melhor suporte a transações complexas
Ecossistema

PostgreSQL possui amplo suporte no mercado e em serviços de nuvem, como:

Railway
Neon
Supabase
AWS RDS

Isso facilita o deploy e a evolução da aplicação.

O que mudou
Substituição do driver SQLite pelo Prisma Client com adapter @prisma/adapter-pg.
Definição do schema do banco através do arquivo prisma/schema.prisma.
Histórico de migrations versionado em prisma/migrations/.
Conexão configurada através da variável de ambiente DATABASE_URL.
Reorganização da camada de acesso a dados utilizando o padrão Repository.
Implementação do PrismaTaskRepository, mantendo a separação entre regras de negócio e persistência.
Ambiente PostgreSQL local disponível através do Docker Compose, facilitando o setup do projeto.

A variável DATABASE_URL segue o padrão:

DATABASE_URL=postgres://usuario:senha@host:porta/nome_do_banco
Arquitetura

A arquitetura mantém a separação de responsabilidades entre as camadas da aplicação:

Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL

Dessa forma, as regras de negócio permanecem desacopladas da implementação específica utilizada para persistência.

Stack atual
Node.js
TypeScript
Fastify
PostgreSQL
Prisma
Zod
Swagger
Vitest
Docker
