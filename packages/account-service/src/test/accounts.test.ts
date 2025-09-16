import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db/prismaClient';
import {
  createTestUser,
  createTestAccount,
  generateTestToken,
  clearTestData
} from './helpers';

describe('Account Endpoints', () => {
  let testUser: any;
  let testAccount: any;
  let authToken: string;

  beforeEach(async () => {
    await clearTestData();
    testUser = await createTestUser();
    testAccount = await createTestAccount(testUser.id);
    authToken = generateTestToken(testUser.id);
  });

  describe('GET /accounts', () => {
    it('should return user accounts', async () => {
      const response = await request(app)
        .get('/accounts')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.accounts).toBeDefined();
      expect(response.body.accounts[0].id).toBe(testAccount.id);
    });

    it('should return 401 without auth token', async () => {
      const response = await request(app)
        .get('/accounts');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /accounts/:id', () => {
    it('should return account details', async () => {
      const response = await request(app)
        .get(`/accounts/${testAccount.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.account).toBeDefined();
      expect(response.body.account.id).toBe(testAccount.id);
      expect(response.body.account.account_number).toBe(testAccount.account_number);
    });

    it('should return 404 for non-existent account', async () => {
      const response = await request(app)
        .get('/accounts/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });

    it('should return 403 for accessing other user\'s account', async () => {
      const otherUser = await createTestUser();
      const otherAccount = await createTestAccount(otherUser.id);

      const response = await request(app)
        .get(`/accounts/${otherAccount.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe('GET /transactions', () => {
    it('should return account transactions', async () => {
      // Create a test transaction first
      await prisma.transaction.create({
        data: {
          from_account_id: testAccount.id,
          amount: 100,
          type: 'TRANSFER',
          status: 'COMPLETED',
          description: 'Test transaction'
        }
      });

      const response = await request(app)
        .get('/transactions')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.transactions).toBeDefined();
      expect(response.body.transactions.length).toBe(1);
      expect(response.body.transactions[0].amount).toBe(100);
    });

    it('should filter transactions by date range', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 30);

      const oldTransaction = await prisma.transaction.create({
        data: {
          from_account_id: testAccount.id,
          amount: 50,
          type: 'TRANSFER',
          status: 'COMPLETED',
          description: 'Old transaction',
          created_at: pastDate
        }
      });

      const newTransaction = await prisma.transaction.create({
        data: {
          from_account_id: testAccount.id,
          amount: 100,
          type: 'TRANSFER',
          status: 'COMPLETED',
          description: 'New transaction'
        }
      });

      const response = await request(app)
        .get('/transactions')
        .query({ 
          fromDate: new Date().toISOString().split('T')[0],
          toDate: new Date().toISOString().split('T')[0]
        })
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.transactions).toBeDefined();
      expect(response.body.transactions.length).toBe(1);
      expect(response.body.transactions[0].amount).toBe(100);
    });
  });
});

afterAll(async () => {
  await clearTestData();
  await prisma.$disconnect();
});