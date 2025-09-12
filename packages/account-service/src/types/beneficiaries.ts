import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { ApiResponse } from './api.js';

interface AuthUser {
  id: string;
  role: string;
  status: string;
}

export interface Beneficiary {
  id: string;
  user_id: string;
  name: string;
  bank_name?: string | null;
  account_number: string;
  ifsc_swift?: string | null;
  currency: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
}

export interface BeneficiaryCreateInput {
  name: string;
  bank_name?: string;
  account_number: string;
  ifsc_swift?: string;
  currency?: string;
}

export interface BeneficiaryUpdateInput {
  name?: string;
  bank_name?: string;
  ifsc_swift?: string;
  is_active?: boolean;
}

export interface BeneficiaryParams {
  beneficiaryId: string;
}

export type BeneficiaryListSuccessResponse = {
  beneficiaries: Beneficiary[];
};

export type BeneficiarySuccessResponse = {
  beneficiary: Beneficiary;
};

export type BeneficiaryErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export type BeneficiaryListResponse = BeneficiaryListSuccessResponse | BeneficiaryErrorResponse;
export type BeneficiaryResponse = BeneficiarySuccessResponse | BeneficiaryErrorResponse;

// Type-safe request types
export interface ListBeneficiariesRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user: AuthUser;
}

export interface AddBeneficiaryRequest extends Request<ParamsDictionary, any, BeneficiaryCreateInput, ParsedQs> {
  user: AuthUser;
}

export interface UpdateBeneficiaryRequest extends Request<BeneficiaryParams, any, BeneficiaryUpdateInput, ParsedQs> {
  user: AuthUser;
}

export interface DeleteBeneficiaryRequest extends Request<BeneficiaryParams, any, any, ParsedQs> {
  user: AuthUser;
}