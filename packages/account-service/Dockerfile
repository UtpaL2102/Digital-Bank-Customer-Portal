# Account service - uses src/index.js at runtime
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY packages/account-service/package.json packages/account-service/pnpm-lock.yaml* ./
RUN pnpm fetch

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY packages/account-service/ ./
# install deps (will populate node_modules)
RUN pnpm install --frozen-lockfile || pnpm install

# If you later switch to a TS build, run pnpm run build here
# RUN pnpm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache ca-certificates
COPY --from=builder /app ./
# we keep the full src in the final image because your entry is src/index.js
# if you change to dist/, update this to COPY --from=builder /app/dist ./dist

EXPOSE 4002
CMD ["node", "src/index.js"]
