// When using Vite's proxy, we don't need the full URL
const BASE_URL = '';  // Using relative URLs with proxy

// Helper to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error occurred' } }));
    throw new Error(error.error?.message || 'API request failed');
  }
  return response.json();
};

// Helper to create request options with authorization
const createRequestOptions = (method, body, token) => {
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Always set Content-Type for non-FormData requests
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const options = { method, headers };
  if (body && method !== 'GET') {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }
  
  return options;
};

// Auth API functions
export const auth = {
  login: (credentials) =>
    fetch(`${BASE_URL}/api/v1/auth/login`, createRequestOptions('POST', credentials))
      .then(handleResponse),

  adminLogin: (credentials) =>
    fetch(`${BASE_URL}/api/v1/admin/login`, createRequestOptions('POST', credentials))
      .then(handleResponse),

  register: (userData) =>
    fetch(`${BASE_URL}/api/v1/auth/register`, createRequestOptions('POST', userData))
      .then(handleResponse),

  changePassword: (passwordData, token) =>
    fetch(`${BASE_URL}/api/v1/auth/change-password`, createRequestOptions('POST', passwordData, token))
      .then(handleResponse),

  requestPasswordReset: (email) =>
    fetch(`${BASE_URL}/api/v1/auth/password-reset/request`, createRequestOptions('POST', { email }))
      .then(handleResponse),

  verifyPasswordReset: (resetData) =>
    fetch(`${BASE_URL}/api/v1/auth/password-reset/verify`, createRequestOptions('POST', resetData))
      .then(handleResponse),

  enable2fa: (token) =>
    fetch(`${BASE_URL}/api/v1/auth/2fa/enable`, createRequestOptions('POST', null, token))
      .then(handleResponse),

  disable2fa: (body, token) =>
    fetch(`${BASE_URL}/api/v1/auth/2fa/disable`, createRequestOptions('POST', body, token))
      .then(handleResponse),

  // add in api.auth
verify2fa: (data, token) => fetch(`${BASE_URL}/api/v1/auth/2fa/verify`, createRequestOptions('POST', data, token)).then(handleResponse),
    
  loginVerify2fa: (verificationData) =>
    fetch(`${BASE_URL}/api/v1/auth/2fa/login-verify`, createRequestOptions('POST', verificationData))
      .then(handleResponse),
      
  me: (token) =>
    fetch(`${BASE_URL}/api/v1/me`, createRequestOptions('GET', null, token))
      .then(handleResponse),
};

// Accounts API functions
export const accounts = {
  getAccountSummary: (token) =>
    fetch(`${BASE_URL}/api/v1/accounts/summary`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  getAccountDetails: (accountId, token) =>
    fetch(`${BASE_URL}/api/v1/accounts/${accountId}`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  getStatements: (params, token) => {
    const url = new URL(`${BASE_URL}/api/v1/statements`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    }
    return fetch(url, createRequestOptions('GET', null, token)).then(handleResponse);
  },

  generateStatement: (statementData, token) =>
    fetch(`${BASE_URL}/api/v1/statements`, createRequestOptions('POST', statementData, token))
      .then(handleResponse),

  getStatementDetails: (statementId, token) =>
    fetch(`${BASE_URL}/api/v1/statements/${statementId}`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  getStatementDownloadToken: (statementId, token) =>
    fetch(`${BASE_URL}/api/v1/statements/${statementId}/download-token`, createRequestOptions('POST', null, token))
      .then(handleResponse),

  getStatementSignedUrl: (statementId, downloadToken, token) =>
    fetch(`${BASE_URL}/api/v1/statements/${statementId}/signed-url?token=${downloadToken}`, createRequestOptions('GET', null, token))
      .then(handleResponse),
};

// Transfers API functions
export const transfers = {
  initiateTransfer: (transferData, token) =>
    fetch(`${BASE_URL}/api/v1/transfer`, createRequestOptions('POST', transferData, token))
      .then(handleResponse),

  listScheduledTransfers: (token) =>
    fetch(`${BASE_URL}/api/v1/scheduled-transfers`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  createScheduledTransfer: (transferData, token) =>
    fetch(`${BASE_URL}/api/v1/scheduled-transfers`, createRequestOptions('POST', transferData, token))
      .then(handleResponse),

  updateScheduledTransfer: (transferId, updateData, token) =>
    fetch(`${BASE_URL}/api/v1/scheduled-transfers/${transferId}`, createRequestOptions('PUT', updateData, token))
      .then(handleResponse),

  pauseScheduledTransfer: (transferId, token) =>
    fetch(`${BASE_URL}/api/v1/scheduled-transfers/${transferId}/pause`, createRequestOptions('POST', null, token))
      .then(handleResponse),

  resumeScheduledTransfer: (transferId, token) =>
    fetch(`${BASE_URL}/api/v1/scheduled-transfers/${transferId}/resume`, createRequestOptions('POST', null, token))
      .then(handleResponse),

  cancelScheduledTransfer: (transferId, token) =>
    fetch(`${BASE_URL}/api/v1/scheduled-transfers/${transferId}/cancel`, createRequestOptions('POST', null, token))
      .then(handleResponse),
};

// KYC API functions
export const kyc = {
  uploadDocument: async (formData, token) => {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const resp = await fetch(`${BASE_URL || ''}/api/v1/kyc/documents`, {
      method: 'POST',
      headers,               // note: no Content-Type here
      body: formData,
    });

    // improved error body handling (so frontend can show server error)
    if (!resp.ok) {
      let text;
      try {
        text = await resp.text();
        let json = JSON.parse(text);
        throw new Error(json?.error?.message || text || `HTTP ${resp.status}`);
      } catch (e) {
        // parsing failed -> throw raw text or status
        throw new Error(text || `HTTP ${resp.status}`);
      }
    }
    return resp.json();
  },

  submitKyc: (kycData, token) =>
    fetch(`${BASE_URL}/api/v1/kyc/submit`, createRequestOptions('POST', kycData, token))
      .then(handleResponse),

  getKycStatus: (token) =>
    fetch(`${BASE_URL}/api/v1/kyc/status`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  // Admin KYC functions
  listAllKyc: (params, token) => {
    let url = `${BASE_URL}/api/v1/admin/kyc`;
    if (params) {
      url += `?${new URLSearchParams(params).toString()}`;
    }
    return fetch(url, createRequestOptions('GET', null, token))
      .then(handleResponse);
  },

  listPendingKyc: (token) =>
    fetch(`${BASE_URL}/api/v1/admin/kyc/pending`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  getUserKyc: (userId, token) =>
    fetch(`${BASE_URL}/api/v1/admin/kyc/${userId}`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  approveKyc: (userId, data, token) =>
    fetch(`${BASE_URL}/api/v1/admin/kyc/${userId}/approve`, createRequestOptions('POST', data, token))
      .then(handleResponse),

  rejectKyc: (userId, data, token) =>
    fetch(`${BASE_URL}/api/v1/admin/kyc/${userId}/reject`, createRequestOptions('POST', data, token))
      .then(handleResponse),
};

// Loans API functions
export const loans = {
  listLoans: (token) =>
    fetch(`${BASE_URL}/api/v1/loans`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  getLoanDetails: (loanId, token) =>
    fetch(`${BASE_URL}/api/v1/loans/${loanId}`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  getRepaymentSchedule: (loanId, token) =>
    fetch(`${BASE_URL}/api/v1/loans/${loanId}/schedule`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  applyLoan: (loanData, token) =>
    fetch(`${BASE_URL}/api/v1/loans`, createRequestOptions('POST', loanData, token))
      .then(handleResponse),
};

// Beneficiaries API functions
export const beneficiaries = {
  listBeneficiaries: (token) =>
    fetch(`${BASE_URL}/api/v1/beneficiaries`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  addBeneficiary: (beneficiaryData, token) =>
    fetch(`${BASE_URL}/api/v1/beneficiaries`, createRequestOptions('POST', beneficiaryData, token))
      .then(handleResponse),

  updateBeneficiary: (beneficiaryId, updateData, token) =>
    fetch(`${BASE_URL}/api/v1/beneficiaries/${beneficiaryId}`, createRequestOptions('PUT', updateData, token))
      .then(handleResponse),

  deleteBeneficiary: (beneficiaryId, token) =>
    fetch(`${BASE_URL}/api/v1/beneficiaries/${beneficiaryId}`, createRequestOptions('DELETE', null, token))
      .then(handleResponse),
};

// Notifications API functions
export const notifications = {
  listNotifications: (token) =>
    fetch(`${BASE_URL}/api/v1/notifications`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  markNotificationRead: (notificationId, token) =>
    fetch(`${BASE_URL}/api/v1/notifications/${notificationId}/read`, createRequestOptions('POST', null, token))
      .then(handleResponse),
};

// Admin API functions
export const admin = {
  // Employee management
  employees: {
    list: (token) => 
      fetch(`${BASE_URL}/api/v1/admin/employees`, createRequestOptions('GET', null, token))
        .then(handleResponse),
    
    create: (data, token) =>
      fetch(`${BASE_URL}/api/v1/admin/employees`, createRequestOptions('POST', data, token))
        .then(handleResponse),

    update: (id, data, token) =>
      fetch(`${BASE_URL}/api/v1/admin/employees/${id}`, createRequestOptions('PUT', data, token))
        .then(handleResponse),

    remove: (id, token) =>
      fetch(`${BASE_URL}/api/v1/admin/employees/${id}`, createRequestOptions('DELETE', null, token))
        .then(handleResponse),
  },

  // Branch management
  branches: {
    list: (token) =>
      fetch(`${BASE_URL}/api/v1/admin/branches`, createRequestOptions('GET', null, token))
        .then(handleResponse),
    
    create: (data, token) =>
      fetch(`${BASE_URL}/api/v1/admin/branches`, createRequestOptions('POST', data, token))
        .then(handleResponse),

    update: (id, data, token) =>
      fetch(`${BASE_URL}/api/v1/admin/branches/${id}`, createRequestOptions('PUT', data, token))
        .then(handleResponse),
    
    remove: (id, token) =>
      fetch(`${BASE_URL}/api/v1/admin/branches/${id}`, createRequestOptions('DELETE', null, token))
        .then(handleResponse),
  },

  // Limit requests management
  limitRequests: {
    list: (token) =>
      fetch(`${BASE_URL}/api/v1/admin/limit-requests`, createRequestOptions('GET', null, token))
        .then(handleResponse),

    approve: (id, data, token) =>
      fetch(`${BASE_URL}/api/v1/admin/limit-requests/${id}/approve`, createRequestOptions('PUT', data, token))
        .then(handleResponse),

    decline: (id, data, token) =>
      fetch(`${BASE_URL}/api/v1/admin/limit-requests/${id}/decline`, createRequestOptions('PUT', data, token))
        .then(handleResponse),
  },

  // Audit logs
  audit: {
    list: async (params, token) => {
      try {
        let url = `${BASE_URL}/api/v1/admin/audit-logs`;
        if (params && Object.keys(params).length > 0) {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (value) searchParams.append(key, value);
          });
          url += `?${searchParams.toString()}`;
        }
        
        console.log('Fetching audit logs from:', url);
        const response = await fetch(url, createRequestOptions('GET', null, token));
        console.log('Audit logs response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Audit logs error:', errorText);
          throw new Error(errorText || `HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Audit logs data:', data);
        return data;
      } catch (err) {
        console.error('Audit logs fetch error:', err);
        throw err;
      }
    }
  }
};

// Export all API functions
export const api = {
  auth,
  accounts,
  transfers,
  kyc,
  loans,
  beneficiaries,
  notifications,
  admin,
};