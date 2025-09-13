import { PrismaClient } from "../../generated/prisma-client";

declare global {
  // allow global `prisma` to avoid hot-reload problems in dev
  // eslint-disable-next-line no-var
  var prismaAuth: PrismaClient | undefined;
}

// Create a single instance or reuse cached one in dev
export const prisma =
  globalThis.prismaAuth ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL, // Prisma reads from schema.prisma by default, but this override is fine
      },
    },
  });

// Connect once at startup
async function init() {
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to database");
  } catch (e) {
    console.error("❌ Failed to connect to database:", e);
    process.exit(1);
  }
}
init();

// Cache instance only in non-production
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaAuth = prisma;
}
