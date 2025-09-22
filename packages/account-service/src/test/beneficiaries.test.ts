import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db/prismaClient';
import {
  createTestUser,
  createTestAccount,
  createTestBeneficiary,
  generateTestToken,
  clearTestData
} from './helpers';

describe('Beneficiary Endpoints', () => {
  let testUser: any;
  let testAccount: any;
  let testBeneficiary: any;
  let authToken: string;

  beforeEach(async () => {
    await clearTestData();
    testUser = await createTestUser();
    testAccount = await createTestAccount(testUser.id);
    testBeneficiary = await createTestBeneficiary(testUser.id);
    authToken = generateTestToken(testUser.id);
  });

  describe('GET /beneficiaries', () => {
    it('should return user beneficiaries', async () => {
      const response = await request(app)
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.beneficiaries).toBeDefined();
      expect(response.body.beneficiaries[0].id).toBe(testBeneficiary.id);
    });

    it('should return empty array when no beneficiaries', async () => {
      await prisma.beneficiary.deleteMany();

      const response = await request(app)
        .get('/beneficiaries')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.beneficiaries).toHaveLength(0);
    });
  });

  describe('POST /beneficiaries', () => {
    const newBeneficiary = {
      name: 'New Beneficiary',
      account_number: 'TEST123456',
      bank_name: 'Test Bank',
      ifsc_swift: 'TEST0001'
    };

    it('should create new beneficiary', async () => {
      const response = await request(app)
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBeneficiary);

      expect(response.status).toBe(201);
      expect(response.body.beneficiary).toBeDefined();
      expect(response.body.beneficiary.name).toBe(newBeneficiary.name);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should prevent duplicate account numbers', async () => {
      const response = await request(app)
        .post('/beneficiaries')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...newBeneficiary,
          account_number: testBeneficiary.account_number
        });

      expect(response.status).toBe(409);
      expect(response.body.error.code).toBe('BENEFICIARY_EXISTS');
    });
  });

  describe('PUT /beneficiaries/:id', () => {
    it('should update beneficiary details', async () => {
      const updates = {
        name: 'Updated Name',
        bank_name: 'Updated Bank'
      };

      const response = await request(app)
        .put(`/beneficiaries/${testBeneficiary.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.beneficiary.name).toBe(updates.name);
      expect(response.body.beneficiary.bank_name).toBe(updates.bank_name);
    });

    it('should prevent updating other user\'s beneficiary', async () => {
      const otherUser = await createTestUser();
      const otherBeneficiary = await createTestBeneficiary(otherUser.id);

      const response = await request(app)
        .put(`/beneficiaries/${otherBeneficiary.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /beneficiaries/:id', () => {
    it('should soft delete beneficiary', async () => {
      const response = await request(app)
        .delete(`/beneficiaries/${testBeneficiary.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(204);

      const beneficiary = await prisma.beneficiary.findUnique({
        where: { id: testBeneficiary.id }
      });

      expect(beneficiary?.is_active).toBe(false);
    });

    it('should prevent deleting other user\'s beneficiary', async () => {
      const otherUser = await createTestUser();
      const otherBeneficiary = await createTestBeneficiary(otherUser.id);

      const response = await request(app)
        .delete(`/beneficiaries/${otherBeneficiary.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
});

afterAll(async () => {
  await clearTestData();
  await prisma.$disconnect();
});