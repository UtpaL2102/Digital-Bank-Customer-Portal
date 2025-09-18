# Digital Bank Customer Portal

A secure, user-friendly, and scalable **full-stack banking platform** built with **MERN Stack**, **Microservices Architecture**, and **PostgreSQL** for all persistent data.  
This application enables customers to **view account details, track transactions, monitor loans, transfer funds**, and interact with an **AI-powered chatbot** for assistance.

---

## Purpose of the Application
The **Digital Bank Customer Portal** provides banking customers with a **centralized and secure platform** to access and manage their financial accounts anytime, anywhere.  
It integrates essential banking functions—such as:
- Viewing account balances
- Reviewing transaction history
- Monitoring loan details

Built with **modular microservices** and **PostgreSQL**, the system ensures:
- **Scalability**
- **Maintainability**
- **Future adaptability** without service disruption.

---

## Usefulness & Benefits
- **Self-Service Banking** — Customers can access account info & transaction history without visiting a branch.  
- **Time-Saving** — Instant access from any device, anywhere.  
- **Secure** — Strong authentication and encrypted data handling.  
- **Better Decision-Making** — Real-time access to financial data.  
- **Future-Ready** — Easily integrates new features without downtime.  

---

## Current Importance
With **digital-first banking** becoming the norm, customers expect seamless online services.  
The pandemic accelerated this shift, reducing branch visits and making **online portals a necessity**.

Banks without robust online portals risk losing customers to competitors.  
A strong platform:
- Meets modern customer expectations
- Improves operational efficiency
- Frees bank staff for **high-value, complex tasks**

---

## Advantages Over Existing Solutions
- **Microservices Architecture** — Independent, scalable modules for faster updates.  
- **PostgreSQL + Prisma** — Type-safe, maintainable, high-performance data operations.  
- **Cloud-Ready** — Optimized for modern hosting solutions.  
- **AI-Integration Ready** — Supports chatbots, analytics, and advanced automation.  
- **Modern UI/UX** — Clean, intuitive, and accessible design for all user groups.  

---

## Tech Stack
- **Frontend:** React.js (with modern UI components)
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL + Prisma ORM
- **Architecture:** Microservices
- **Authentication:** JWT-based secure login
- **AI Chatbot:** Python-based GenAI integration

---

## Features
- **Secure User Registration & Login**
- **Account Balance Overview**
- **Transaction History Tracking**
- **Loan Management**
- **Funds Transfer**
- **AI Chatbot Assistance**
- **Responsive Design** for mobile & desktop

## Project Structure

```plaintext
digital-bank/                        <-- Root repo (monorepo)
├─ .github/workflows/                <-- CI/CD workflows (GitHub Actions)
├─ Jenkinsfile                        <-- Jenkins pipeline (alternative CI/CD)
│
├─ infra/                             <-- Infra + local dev tooling
│  ├─ docker-compose.dev.yml          <-- Local dev stack (Postgres + services)
│  ├─ eureka/                        <-- Eureka server setup (instead of k8s)
│  │  ├─ Dockerfile                  <-- Eureka server container
│  │  ├─ application.yml             <-- Eureka config
│  │  └─ docker-compose.override.yml <-- Optional extra settings
│  └─ env/                            <-- Environment files
│     ├─ auth.dev.env
│     ├─ account.dev.env
│     ├─ bff.dev.env
│     ├─ chatbot.dev.env              <-- For python service
│     ├─ postgres.dev.env
│     └─ eureka.dev.env              <-- Eureka server config (host, port)
│
├─ packages/                          <-- All code packages (Node.js/TS services)
│  ├─ common/                         <-- Shared code across all services
│  │  ├─ src/
│  │  │  ├─ config.ts                 <-- Env loader
│  │  │  ├─ logger.ts                 <-- Pino logger
│  │  │  ├─ errors.ts                 <-- Custom error classes
│  │  │  ├─ http.ts                   <-- Request validation helpers
│  │  │  └─ types.ts                  <-- Shared TS types
│  │  └─ package.json
│  │
│  ├─ contracts/                      <-- Shared DTOs/types (service contracts)
│  │  └─ src/
│  │     ├─ auth.ts
│  │     ├─ accounts.ts
│  │     ├─ transactions.ts
│  │     ├─ limits.ts
│  │     └─ notifications.ts
│  │  └─ package.json
│  │
│  ├─ bff/                            <-- Backend-for-Frontend (API Gateway)
│  │  ├─ src/
│  │  │  ├─ index.ts                  <-- Entrypoint
│  │  │  ├─ app.ts                    <-- Express app setup
│  │  │  ├─ routes/                   <-- Routes for frontend
│  │  │  │  ├─ auth.bff.routes.ts
│  │  │  │  ├─ accounts.bff.routes.ts
│  │  │  │  ├─ transfers.bff.routes.ts
│  │  │  │  ├─ limits.bff.routes.ts
│  │  │  │  └─ notifications.bff.routes.ts
│  │  │  ├─ middlewares/              <-- BFF-specific middleware
│  │  │  └─ clients/                  <-- Clients to call microservices
│  │  ├─ openapi/                    <-- Swagger docs for BFF
│  │  │  ├─ bff.yaml
│  │  │  └─ bff.swagger.json
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ auth-service/                   <-- Microservice #1
│  │  ├─ src/
│  │  │  ├─ index.ts                  <-- Entrypoint
│  │  │  ├─ app.ts
│  │  │  ├─ routes/
│  │  │  │  ├─ auth.routes.ts
│  │  │  ├─ controllers/
│  │  │  │  ├─ auth.controller.ts
│  │  │  ├─ services/
│  │  │  │  ├─ auth.service.ts
│  │  │  ├─ db/
│  │  │  │  ├─ prismaClient.ts
│  │  │  ├─ schemas/                  <-- Zod/Joi validation
│  │  │  ├─ middlewares/
│  │  │  ├─ health/                   <-- /healthz, /readyz
│  │  │  ├─ openapi/                 <-- Swagger/OpenAPI specs
│  │  │  │  ├─ auth.yaml
│  │  │  │  └─ auth.swagger.json
│  │  │  └─ discovery/               <-- Eureka client registration
│  │  │     └─ eureka.client.ts
│  │  │  └─ clients/                  <-- Outbound calls
│  │  ├─ prisma/
│  │  │  ├─ schema.prisma
│  │  │  └─ migrations/
│  │  ├─ Dockerfile
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ account-service/                <-- Microservice #2
│  │  ├─ src/
│  │  │  ├─ index.ts
│  │  │  ├─ app.ts
│  │  │  ├─ routes/
│  │  │  │  ├─ account.routes.ts
│  │  │  ├─ controllers/
│  │  │  │  ├─ account.controller.ts
│  │  │  ├─ services/
│  │  │  │  ├─ account.service.ts
│  │  │  ├─ db/
│  │  │  │  ├─ prismaClient.ts
│  │  │  ├─ schemas/
│  │  │  ├─ middlewares/
│  │  │  ├─ health/
│  │  │  ├─ openapi/                 <-- Swagger/OpenAPI specs
│  │  │  │  ├─ account.yaml
│  │  │  │  └─ account.swagger.json
│  │  │  └─ discovery/               <-- Eureka client registration
│  │  │     └─ eureka.client.ts
│  │  │  └─ clients/
│  │  │     ├─ auth.client.ts
│  │  ├─ prisma/
│  │  │  ├─ schema.prisma
│  │  │  └─ migrations/
│  │  ├─ Dockerfile
│  │  ├─ tsconfig.json
│  │  └─ package.json
│
├─ python/                            <-- Polyglot services
│  └─ chatbot-service/                 <-- FastAPI chatbot
│     ├─ app.py
│     ├─ requirements.txt
│     ├─ Dockerfile
│     └─ tests/
│     └─ openapi/                    <-- FastAPI auto-generates Swagger at /docs
│        └─ chatbot_openapi.json
│
├─ postman/                           <-- API testing
│  ├─ DigitalBank.postman_collection.json
│  └─ DigitalBank.postman_environment.json
│
├─ package.json
├─ tsconfig.base.json                  <-- Shared TS config for all services
└─ README.md

# Digital Bank Monorepo

## Prerequisites
- Node.js 20 LTS
- pnpm
- Docker
- Python 3.10+

## Setup Instruction

### 1️⃣ Install dependencies

Run from the root:
Step 1:

```bash
npm install -g pnpm
```
Step 2:

```bash
pnpm install
```

### 2️⃣ Start infrastructure (DB + Eureka) only in porduction

```bash
docker-compose -f infra/docker-compose.dev.yml up -d
```

This will start:

* **Postgres** (with `postgres.dev.env`)
* **Eureka Server** (service discovery)

Check Eureka UI at:  
👉 [http://localhost:8761](http://localhost:8761)

---

### 3️⃣ Generate Prisma clients (Step 3)

Run once for each service from root folder:

```bash
pnpm -C packages/auth-service prisma:generate
pnpm -C packages/auth-service prisma:migrate

```

### 4️⃣ Apply database migrations

```bash
pnpm -C packages/account-service prisma:generate
pnpm -C packages/account-service prisma:migrate
```

---

### 5️⃣ Run microservices (Step 4)

Each service can be started individually:

```bash
pnpm -C packages/auth-service dev
pnpm -C packages/account-service dev
pnpm -C packages/bff dev
pnpm -C python/chatbot-service dev   # if defined in requirements
```

Or run all together (if you add a root script later):

```bash
pnpm dev
```

---

## 📖 API Documentation (Swagger)

Each service exposes Swagger/OpenAPI documentation:

* **Auth Service** → [http://localhost:4001/api-docs](http://localhost:4001/api-docs)
* **Account Service** → [http://localhost:4002/api-docs](http://localhost:4002/api-docs)
* **BFF (API Gateway)** → [http://localhost:4000/api-docs](http://localhost:4000/api-docs)
* **Chatbot (FastAPI)** → [http://localhost:5000/docs](http://localhost:5000/docs)

---

## 🔎 Service Discovery (Eureka)

* **Eureka Dashboard:** [http://localhost:8761](http://localhost:8761)
* All services (`auth-service`, `account-service`, `bff`, `chatbot`) will **auto-register** here.
* BFF uses Eureka to discover backend microservices dynamically.

---



## Health URLs
- BFF: http://localhost:4000/api/v1/healthz
- Auth: http://localhost:4001/healthz
- Account: http://localhost:4002/healthz
- Chatbot: http://localhost:5001/healthz

## Example curl
```
curl http://localhost:4000/api/v1/healthz
```

## Prisma Migrations
```
pnpm migrate:auth
pnpm migrate:account
```



## Danger: Reset DB
```
pnpm db:reset
```

## Postman
Import the collection and environment from /postman.
Set {{baseUrl}} to http://localhost:4000/api/v1

## OpenAPI
BFF OpenAPI spec at /docs (dev only)

