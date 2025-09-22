import { prisma } from '../db/prismaClient';

beforeAll(async () => {
  // Clear test database before all tests
  await prisma.$transaction([
    prisma.transaction.deleteMany(),
    prisma.beneficiary.deleteMany(),
    prisma.statement.deleteMany(),
    prisma.account.deleteMany()
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
});