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
│  ├─ k8s/                            <-- Kubernetes manifests (deployments, svc, ingress)
│  └─ env/                            <-- Environment files
│     ├─ auth.dev.env
│     ├─ account.dev.env
│     ├─ bff.dev.env
│     ├─ chatbot.dev.env              <-- For python service
│     ├─ postgres.dev.env
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
│  │  ├─ openapi/                     <-- BFF OpenAPI spec
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
│  │  │  ├─ openapi/                  <-- Swagger/OpenAPI
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
│  │  │  ├─ openapi/
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
│
├─ postman/                           <-- API testing
│  ├─ DigitalBank.postman_collection.json
│  └─ DigitalBank.postman_environment.json
│
├─ package.json
├─ tsconfig.base.json                  <-- Shared TS config for all services
└─ README.md

