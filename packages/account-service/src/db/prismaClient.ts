import { PrismaClient } from "../../generated/prisma-client";

declare global {
// eslint-disable-next-line no-var
var prismaAccounts: PrismaClient | undefined;
}

export const prisma =
global.prismaAccounts ||
new PrismaClient({
log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") global.prismaAccounts = prisma;