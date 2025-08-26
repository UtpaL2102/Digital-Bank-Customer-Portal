FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install --frozen-lockfile
CMD ["pnpm", "dev"]
EXPOSE 4000
