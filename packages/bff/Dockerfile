# BFF - compile TS then run built JS (recommended)
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY packages/bff/package.json packages/bff/pnpm-lock.yaml* ./
RUN pnpm fetch

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY packages/bff/ ./
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod

EXPOSE 4000
CMD ["node", "src/index.js"]
