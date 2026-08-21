# Boilerplate API — Migração SQLite → PostgreSQL

## 📚 Documentação

A documentação completa do processo de migração, decisões técnicas e arquitetura está disponível no Notion:

🔗 [Boilerplate de API REST — Arquitetura em Camadas (Fastify + TypeScript)](https://app.notion.com/p/Boilerplate-de-API-REST-Arquitetura-em-Camadas-Fastify-TypeScript-3c238d9e04fe8039b148c30ab160cd3d?source=copy_link)

---

## 🚀 Sobre o projeto

Este projeto nasceu como um boilerplate para desenvolvimento de APIs REST, originalmente estruturado utilizando **SQLite** e **SQL puro**.

Durante a evolução do projeto, foi realizada a migração do banco de dados de **SQLite para PostgreSQL**, utilizando o **Prisma** como camada de acesso a dados.

---

## 🔄 Por que migrar?

O SQLite é uma excelente opção para prototipagem rápida, aplicações locais e ambientes simples. Porém, conforme a aplicação cresce, algumas limitações podem se tornar relevantes.

### Concorrência

O SQLite possui limitações relacionadas a múltiplas operações simultâneas de escrita, o que pode se tornar um gargalo em APIs com maior volume de requisições.

### Escalabilidade

O PostgreSQL foi projetado para ambientes de produção, oferecendo suporte a múltiplos usuários, maiores volumes de dados, conexões simultâneas e estratégias de replicação.

### Recursos avançados

O PostgreSQL oferece recursos mais avançados, como:

* Tipos de dados mais ricos
* Constraints robustas
* Transações complexas
* `JSONB`
* Full-text search
* Extensões
* Índices avançados

### Ecossistema

O PostgreSQL possui amplo suporte no mercado e está disponível em diversos serviços de infraestrutura e cloud, como:

* Railway
* Neon
* Supabase
* AWS RDS

Isso facilita o deploy e permite que a aplicação evolua para ambientes mais robustos.

---

## 🛠️ O que mudou?

Durante a migração, foram realizadas as seguintes alterações:

* Substituição do driver SQLite pelo **Prisma Client** com o adapter `@prisma/adapter-pg`.
* Definição do schema do banco através do arquivo `prisma/schema.prisma`.
* Criação e versionamento do histórico de migrations em `prisma/migrations/`.
* Configuração da conexão com o banco através da variável de ambiente `DATABASE_URL`.
* Reorganização da camada de acesso a dados utilizando o padrão **Repository**.
* Implementação do `PrismaTaskRepository`.
* Manutenção da separação entre regras de negócio e persistência.
* Configuração de um ambiente PostgreSQL local utilizando **Docker Compose**.
* Facilitação do setup do projeto através de containers.

A variável `DATABASE_URL` segue o padrão:

```dotenv
DATABASE_URL=postgres://usuario:senha@host:porta/nome_do_banco
```

---

## 🏗️ Arquitetura

A arquitetura mantém a separação de responsabilidades entre as diferentes camadas da aplicação:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

Essa estrutura permite que as regras de negócio permaneçam desacopladas da implementação específica utilizada para persistência.

Dessa forma, alterações na camada de banco de dados podem ser realizadas com menor impacto nas demais partes da aplicação.

---

## 📦 Stack atual

* **Node.js**
* **TypeScript**
* **Fastify**
* **PostgreSQL**
* **Prisma**
* **Zod**
* **Swagger**
* **Vitest**
* **Docker**

---

## 🎯 Objetivo

O objetivo deste projeto é servir como um **boilerplate reutilizável para desenvolvimento de APIs REST**, utilizando uma arquitetura organizada e preparada para evolução.

A migração para PostgreSQL e Prisma também permite que o projeto esteja mais próximo de uma estrutura utilizada em aplicações reais de produção.
