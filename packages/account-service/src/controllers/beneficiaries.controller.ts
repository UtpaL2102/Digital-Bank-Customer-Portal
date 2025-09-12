import { Response } from 'express';
import { prisma } from '../db/prismaClient.js';
import {
  ListBeneficiariesRequest,
  AddBeneficiaryRequest,
  UpdateBeneficiaryRequest,
  DeleteBeneficiaryRequest,
  BeneficiaryListResponse,
  BeneficiaryResponse
} from '../types/beneficiaries.js';

export const listBeneficiaries = async (req: ListBeneficiariesRequest, res: Response<BeneficiaryListResponse>) => {
  try {
    const userId = (req as any).user.id;

    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        user_id: userId,
        is_active: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return res.json({ beneficiaries });
  } catch (error) {
    console.error('listBeneficiaries error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve beneficiaries'
      }
    });
  }
};

export const addBeneficiary = async (req: AddBeneficiaryRequest, res: Response<BeneficiaryResponse>) => {
  try {
    const userId = (req as any).user.id;
    const { name, bank_name, account_number, ifsc_swift, currency = 'INR' } = req.body;

    // Validate required fields
    if (!name || !account_number) {
      return res.status(400).json({
        error: {
          code: 'INVALID_REQUEST',
          message: 'Name and account number are required'
        }
      });
    }

    // Check for duplicate
    const existing = await prisma.beneficiary.findFirst({
      where: {
        user_id: userId,
        account_number,
        is_active: true
      }
    });

    if (existing) {
      return res.status(409).json({
        error: {
          code: 'BENEFICIARY_EXISTS',
          message: 'A beneficiary with this account number already exists'
        }
      });
    }

    const beneficiary = await prisma.beneficiary.create({
      data: {
        user_id: userId,
        name,
        bank_name,
        account_number,
        ifsc_swift,
        currency
      }
    });

    return res.status(201).json({ beneficiary });
  } catch (error) {
    console.error('addBeneficiary error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to add beneficiary'
      }
    });
  }
};

export const updateBeneficiary = async (req: UpdateBeneficiaryRequest, res: Response<BeneficiaryResponse>) => {
  try {
    const userId = (req as any).user.id;
    const { beneficiaryId } = req.params;
    const { name, bank_name, ifsc_swift, is_active } = req.body;

    // Find and verify ownership
    const existing = await prisma.beneficiary.findFirst({
      where: {
        id: beneficiaryId,
        user_id: userId
      }
    });

    if (!existing) {
      return res.status(404).json({
        error: {
          code: 'BENEFICIARY_NOT_FOUND',
          message: 'Beneficiary not found'
        }
      });
    }

    const beneficiary = await prisma.beneficiary.update({
      where: { id: beneficiaryId },
      data: {
        name,
        bank_name,
        ifsc_swift,
        is_active,
        updated_at: new Date()
      }
    });

    return res.json({ beneficiary });
  } catch (error) {
    console.error('updateBeneficiary error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update beneficiary'
      }
    });
  }
};

export const deleteBeneficiary = async (req: DeleteBeneficiaryRequest, res: Response<BeneficiaryResponse>) => {
  try {
    const userId = (req as any).user.id;
    const { beneficiaryId } = req.params;

    // Find and verify ownership
    const existing = await prisma.beneficiary.findFirst({
      where: {
        id: beneficiaryId,
        user_id: userId
      }
    });

    if (!existing) {
      return res.status(404).json({
        error: {
          code: 'BENEFICIARY_NOT_FOUND',
          message: 'Beneficiary not found'
        }
      });
    }

    // Soft delete by marking inactive
    await prisma.beneficiary.update({
      where: { id: beneficiaryId },
      data: {
        is_active: false,
        updated_at: new Date()
      }
    });

    return res.status(204).send();
  } catch (error) {
    console.error('deleteBeneficiary error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to delete beneficiary'
      }
    });
  }
};