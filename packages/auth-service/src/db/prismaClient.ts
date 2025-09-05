import { PrismaClient } from "@prisma/client";
declare global {
// eslint-disable-next-line no-var
var prismaAuth: PrismaClient | undefined;
}

export const prisma =
global.prismaAuth ||
new PrismaClient({
log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") global.prismaAuth = prisma;