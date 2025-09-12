import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaAuth: PrismaClient | undefined;
}

const prisma = global.prismaAuth || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
});

// Validate database connection on startup
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((e) => {
    console.error('Failed to connect to database:', e);
    process.exit(1);
  });

if (process.env.NODE_ENV !== "production") {
  global.prismaAuth = prisma;
}

export { prisma };