import { Request } from 'express';

export interface ApiResponse<T> {
  status?: 'success' | 'error';
  data?: T;
  error?: string;
  details?: unknown;
  code?: string;
  metadata?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  logs: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export type TypedRequestQuery<T> = Request<object, object, object, T>;
export type TypedRequestBody<T> = Request<object, object, T>;
export type TypedRequestParams<T> = Request<T>;
export type TypedRequest<T extends object, U extends object> = Request<object, object, T, U>;