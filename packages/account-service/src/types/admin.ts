import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Decimal } from '@prisma/client/runtime/library';

export interface Employee {
  id: string;
  user_id: string;
  branch_id: string;
  position: string | null;
  branch?: Branch;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string | null;
  created_at: Date;
  updated_at?: Date;
  employees?: Employee[];
}

export interface AccountLimits {
  dailyLimit: Decimal;
  monthlyLimit: Decimal;
}

export interface EmployeeCreateInput {
  userId: string;
  branchId: string;
  position: string;
}

export interface EmployeeUpdateInput {
  branchId?: string;
  position?: string;
}

export interface BranchCreateInput {
  name: string;
  code: string;
  address: string;
}

export interface BranchUpdateInput {
  name?: string;
  code?: string;
  address?: string;
}

export type AdminRequestParams = {
  accountId?: string;
  employeeId?: string;
  branchId?: string;
} & ParamsDictionary;

// Type-safe request types
export interface UpdateAccountLimitsRequest extends Request<AdminRequestParams, any, AccountLimits, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface ListEmployeesRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface AddEmployeeRequest extends Request<ParamsDictionary, any, EmployeeCreateInput, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface UpdateEmployeeRequest extends Request<AdminRequestParams, any, EmployeeUpdateInput, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface ListBranchesRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface AddBranchRequest extends Request<ParamsDictionary, any, BranchCreateInput, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export interface UpdateBranchRequest extends Request<AdminRequestParams, any, BranchUpdateInput, ParsedQs> {
  user: { id: string; role: string; status: string; };
}

export type AdminErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

// Response types
export type AccountResponse = {
  account: {
    id: string;
    daily_limit: Decimal | null;
    monthly_limit: Decimal | null;
    updated_at: Date;
  };
} | AdminErrorResponse;

export type EmployeeListResponse = {
  employees: Employee[];
} | AdminErrorResponse;

export type EmployeeResponse = {
  employee: Employee;
} | AdminErrorResponse;

export type BranchListResponse = {
  branches: Branch[];
} | AdminErrorResponse;

export type BranchResponse = {
  branch: Branch;
} | AdminErrorResponse;