# Digital Bank Monorepo

## Prerequisites
- Node.js 20 LTS
- pnpm
- Docker
- Python 3.10+

## How to Run (Dev)

```sh
pnpm install
pnpm dev
# or
cd infra
# set env files in infra/env/*.env
# then
pnpm run docker:dev
```

Or use Docker Compose:

```sh
docker-compose -f infra/docker-compose.dev.yml up --build
```

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

## Seeding
```
pnpm -C packages/auth-service seed
pnpm -C packages/account-service seed
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

## Scripts
- `pnpm dev:bff`, `dev:auth`, `dev:account`
- `pnpm migrate:auth`, `migrate:account`
- `pnpm db:reset`
