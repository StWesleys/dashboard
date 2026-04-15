# 📊 User Dashboard (Fullstack)

Aplicação fullstack para gerenciamento de usuários, com **frontend em React** e **backend em NestJS**, simulando um cenário real de mercado com integração via API REST.

---

## 🚀 Funcionalidades

### Backend (NestJS)

* CRUD completo de usuários
* Validação com DTO
* Integração com banco via Prisma
* Tratamento de erros (em evolução)

### Frontend (React)

* Listagem de usuários
* Criação de usuários
* Consumo de API REST
* Gerenciamento de estado com Hooks

---

## 🧱 Tecnologias utilizadas

### 🔹 Frontend

* React
* Vite
* JavaScript (ou TypeScript)
* Hooks (useState, useEffect, etc)
* Fetch API

### 🔹 Backend

* Node.js
* NestJS
* Prisma ORM

### 🔹 Banco de dados

* SQLite (dev)
* (Planejado: PostgreSQL)

---

## 📁 Estrutura do projeto

```id="9k9xrx"
project/
  api/   # backend NestJS
  web/   # frontend React
```

---

## ⚙️ Como rodar o projeto

### 🔹 1. Clonar o repositório

```bash id="z9mx0t"
git clone <url-do-repositorio>
cd project
```

---

## 🔹 2. Rodar o backend

```bash id="v8f4ws"
cd api
npm install
npx prisma migrate dev
npm run start:dev
```

Backend disponível em:

```id="jw86nt"
http://localhost:3000
```

---

## 🔹 3. Rodar o frontend

```bash id="xg8v3m"
cd ../web
npm install
npm run dev
```

Frontend disponível em:

```id="nqclls"
http://localhost:5173
```

---

## 🔌 Integração

O frontend consome a API do backend via:

```id="yx6g7k"
http://localhost:3000/users
```

---

## 📌 Endpoints principais

* `GET /users`
* `GET /users/:id`
* `POST /users`
* `PUT /users/:id`
* `DELETE /users/:id`

---

## 📈 Roadmap

* [ ] Tratamento global de erros
* [ ] Autenticação (JWT)
* [ ] Paginação
* [ ] Deploy (Vercel + Render ou similar)

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido para:

* Praticar arquitetura fullstack moderna
* Consolidar conceitos de React + NestJS
* Simular um ambiente real de desenvolvimento

---

## 👨‍💻 Autor

Projeto desenvolvido para estudo e evolução como desenvolvedor fullstack.
