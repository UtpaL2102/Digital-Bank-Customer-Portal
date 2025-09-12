import { Response } from 'express';
import { prisma } from '../db/prismaClient.js';
import {
  UpdateAccountLimitsRequest,
  ListEmployeesRequest,
  AddEmployeeRequest,
  UpdateEmployeeRequest,
  ListBranchesRequest,
  AddBranchRequest,
  UpdateBranchRequest,
  AccountResponse,
  EmployeeListResponse,
  EmployeeResponse,
  BranchListResponse,
  BranchResponse
} from '../types/admin.js';

export const updateAccountLimits = async (req: UpdateAccountLimitsRequest, res: Response<AccountResponse>) => {
  try {
    const { accountId } = req.params;
    const { dailyLimit, monthlyLimit } = req.body;

  const account = await prisma.account.update({
      where: { id: accountId },
      data: {
        daily_limit: dailyLimit,
        monthly_limit: monthlyLimit,
        updated_at: new Date()
      }
    });

    return res.json({ account });
  } catch (error) {
    console.error('updateAccountLimits error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update account limits'
      }
    });
  }
};

export const listEmployees = async (req: ListEmployeesRequest, res: Response<EmployeeListResponse>) => {
  try {
  const employees = await prisma.employee.findMany({
      include: {
        branch: true
      }
    });

    return res.json({ employees });
  } catch (error) {
    console.error('listEmployees error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve employees'
      }
    });
  }
};

export const addEmployee = async (req: AddEmployeeRequest, res: Response<EmployeeResponse>) => {
  try {
    const { userId, branchId, position } = req.body;

  const employee = await prisma.employee.create({
      data: {
        user_id: userId,
        branch_id: branchId,
        position
      },
      include: {
        branch: true
      }
    });

    return res.status(201).json({ employee });
  } catch (error) {
    console.error('addEmployee error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to add employee'
      }
    });
  }
};

export const updateEmployee = async (req: UpdateEmployeeRequest, res: Response<EmployeeResponse>) => {
  try {
    const { employeeId } = req.params;
    const { branchId, position } = req.body;

  const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        branch_id: branchId,
        position
      },
      include: {
        branch: true
      }
    });

    return res.json({ employee });
  } catch (error) {
    console.error('updateEmployee error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update employee'
      }
    });
  }
};

export const listBranches = async (req: ListBranchesRequest, res: Response<BranchListResponse>) => {
  try {
  const branches = await prisma.branch.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        employees: true
      }
    });

    return res.json({ branches });
  } catch (error) {
    console.error('listBranches error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to retrieve branches'
      }
    });
  }
};

export const addBranch = async (req: AddBranchRequest, res: Response<BranchResponse>) => {
  try {
    const { name, address, code } = req.body;

  const branch = await prisma.branch.create({
      data: {
        name,
        code,
        address
      }
    });

    return res.status(201).json({ branch });
  } catch (error) {
    console.error('addBranch error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to add branch'
      }
    });
  }
};

export const updateBranch = async (req: UpdateBranchRequest, res: Response<BranchResponse>) => {
  try {
    const { branchId } = req.params;
    const { name, code, address } = req.body;

  const branch = await prisma.branch.update({
      where: { id: branchId },
      data: {
        name,
        code,
        address
      }
    });

    return res.json({ branch });
  } catch (error) {
    console.error('updateBranch error:', error);
    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update branch'
      }
    });
  }
};