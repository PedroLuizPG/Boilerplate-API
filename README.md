# Boilerplate API — Migração SQLite → PostgreSQL

## 📚 Documentação

A documentação completa do processo de migração, decisões técnicas e arquitetura está disponível no Notion:

🔗 [Boilerplate de API REST — Arquitetura em Camadas (Fastify + TypeScript)](https://app.notion.com/p/Boilerplate-de-API-REST-Arquitetura-em-Camadas-Fastify-TypeScript-3c238d9e04fe8039b148c30ab160cd3d?source=copy_link)

---

## 🚀 Sobre o projeto

Este projeto nasceu como um boilerplate para desenvolvimento de APIs REST, originalmente estruturado utilizando **SQLite** e **SQL puro**.

Durante a evolução do projeto, foi realizada a migração do banco de dados de **SQLite para PostgreSQL**, utilizando o **Prisma** como camada de acesso a dados.

---

## 🔄 Por que do projeto?

Este projeto foi feito para estudos e se aprofundar mais em conceitos de backend, onde foi documentado todos os passos para começar a criar uma Api REST

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
