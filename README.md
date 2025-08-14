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
digital-bank/                        <-- Root repo
├─ .github/workflows/                <-- (For CI/CD in GitHub Actions; Jenkinsfile goes in root)
├─ Jenkinsfile                        <-- Jenkins pipeline for build/test/deploy
├─ infra/                             <-- Infrastructure & local dev tooling
│  ├─ docker-compose.dev.yml          <-- Spins up Postgres + all services in dev
│  └─ env/                            <-- .env files for local dev configs
│     ├─ auth.dev.env
│     ├─ account.dev.env
│     ├─ postgres.dev.env
├─ packages/                          <-- All code packages live here
│  ├─ common/                         <-- Shared code across all services
│  │  ├─ src/
│  │  │  ├─ config.ts                 <-- Env config loader
│  │  │  ├─ logger.ts                 <-- Logger (e.g., pino)
│  │  │  ├─ errors.ts                 <-- Custom error classes
│  │  │  ├─ http.ts                   <-- Request validation helpers
│  │  │  └─ types.ts                  <-- Shared TypeScript types
│  │  └─ package.json
│  │
│  ├─ auth-service/                   <-- Microservice #1
│  │  ├─ src/
│  │  │  ├─ index.ts                  <-- Service entrypoint (starts Express server)
│  │  │  ├─ app.ts                    <-- Express app setup (middlewares, routes)
│  │  │  ├─ routes/                   <-- API route definitions
│  │  │  │  ├─ auth.routes.ts
│  │  │  ├─ controllers/              <-- Receives HTTP requests, calls services
│  │  │  │  ├─ auth.controller.ts
│  │  │  ├─ services/                 <-- Business logic (register, login, JWT)
│  │  │  │  ├─ auth.service.ts
│  │  │  ├─ db/                        <-- Database connection (Prisma or pg-pool)
│  │  │  │  ├─ prismaClient.ts
│  │  │  ├─ schemas/                  <-- Request/response validation (Zod/Yup/Joi)
│  │  │  ├─ middlewares/              <-- auth middleware, error handler
│  │  │  ├─ health/                    <-- /healthz and /readyz endpoints
│  │  │  ├─ openapi/                   <-- Swagger/OpenAPI spec
│  │  │  └─ clients/                   <-- Outbound HTTP calls to other services
│  │  │     ├─ account.client.ts       <-- Handles requests to account-service
│  │  ├─ prisma/
│  │  │  ├─ schema.prisma             <-- DB schema for AuthService
│  │  │  └─ migrations/
│  │  ├─ Dockerfile
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  └─ account-service/                <-- Microservice #2
│     ├─ src/
│     │  ├─ index.ts
│     │  ├─ app.ts
│     │  ├─ routes/
│     │  │  ├─ account.routes.ts
│     │  ├─ controllers/
│     │  │  ├─ account.controller.ts
│     │  ├─ services/
│     │  │  ├─ account.service.ts
│     │  ├─ db/
│     │  │  ├─ prismaClient.ts
│     │  ├─ schemas/
│     │  ├─ middlewares/
│     │  ├─ health/
│     │  ├─ openapi/
│     │  └─ clients/                  <-- Outbound HTTP calls to other services
│     │     ├─ auth.client.ts         <-- Handles requests to auth-service
│     ├─ prisma/
│     │  ├─ schema.prisma             <-- DB schema for AccountService
│     │  └─ migrations/
│     ├─ Dockerfile
│     ├─ tsconfig.json
│     └─ package.json
├─ package.json
└─ README.md

