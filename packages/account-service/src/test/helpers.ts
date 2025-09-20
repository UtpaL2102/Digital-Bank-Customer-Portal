import { prisma } from '../db/prismaClient';
import jwt from 'jsonwebtoken';

export const createTestUser = async (role = 'USER') => {
  const user = await prisma.user.create({
    data: {
      email: `test${Date.now()}@example.com`,
      name: 'Test User',
      role
    }
  });

  return user;
};

export const createTestAccount = async (userId: string) => {
  const account = await prisma.account.create({
    data: {
      user_id: userId,
      account_number: `TEST${Date.now()}`,
      balance: 1000,
      currency: 'INR',
      status: 'ACTIVE'
    }
  });

  return account;
};

export const createTestBeneficiary = async (userId: string) => {
  const beneficiary = await prisma.beneficiary.create({
    data: {
      user_id: userId,
      name: 'Test Beneficiary',
      account_number: `BENF${Date.now()}`,
      bank_name: 'Test Bank',
      ifsc_swift: 'TEST0001',
      is_active: true
    }
  });

  return beneficiary;
};

export const generateTestToken = (userId: string, role = 'USER') => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};

export const clearTestData = async () => {
  await prisma.$transaction([
    prisma.transaction.deleteMany(),
    prisma.beneficiary.deleteMany(),
    prisma.statement.deleteMany(),
    prisma.account.deleteMany(),
    prisma.user.deleteMany()
  ]);
};