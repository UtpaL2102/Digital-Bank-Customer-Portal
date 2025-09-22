# Auth service - uses src/index.js at runtime
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY packages/auth-service/package.json packages/auth-service/pnpm-lock.yaml* ./
RUN pnpm fetch

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY packages/auth-service/ ./
RUN pnpm install --frozen-lockfile || pnpm install

# If/when you compile TS -> dist, run pnpm run build here
# RUN pnpm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache ca-certificates
COPY --from=builder /app ./

EXPOSE 4001
CMD ["node", "src/index.js"]
