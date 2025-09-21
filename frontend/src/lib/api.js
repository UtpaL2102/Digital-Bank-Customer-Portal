// When using Vite's proxy, we don't need the full URL
const BASE_URL = '';  // Using relative URLs with proxy

// API response types for better type checking
const API_RESPONSE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

// Common error types
const API_ERROR_TYPES = {
  NETWORK: 'network_error',
  AUTH: 'auth_error',
  VALIDATION: 'validation_error',
  SERVER: 'server_error',
  NOT_FOUND: 'not_found',
};

/**
 * Format currency amount consistently across the application
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'INR')
 * @returns {string} Formatted currency string
 */
const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Parse API error responses into a standardized format
 * @param {Response} response - The fetch Response object
 * @param {Object} errorData - Parsed error data from response
 * @returns {Error} Standardized error object with type and details
 */
const parseApiError = (response, errorData) => {
  const error = new Error(errorData?.error?.message || errorData?.message || `HTTP ${response.status}`);
  
  // Determine error type based on status code and response
  switch (response.status) {
    case 400:
      error.type = API_ERROR_TYPES.VALIDATION;
      break;
    case 401:
    case 403:
      error.type = API_ERROR_TYPES.AUTH;
      break;
    case 404:
      error.type = API_ERROR_TYPES.NOT_FOUND;
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      error.type = API_ERROR_TYPES.SERVER;
      break;
    default:
      error.type = API_ERROR_TYPES.SERVER;
  }

  error.status = response.status;
  error.data = errorData;
  return error;
};

/**
 * Handle API responses with enhanced error handling and response transformation
 * @param {Response} response - The fetch Response object
 * @returns {Promise<Object>} Parsed response data
 * @throws {Error} Standardized error object for non-ok responses
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `HTTP ${response.status}` };
    }
    
    throw parseApiError(response, errorData);
  }
  
  try {
    const data = await response.json();
    if (!data && response.status !== 204) {
      throw new Error('Empty response from server');
    }
    return data;
  } catch (e) {
    if (response.status === 204) {
      return null; // Return null for 204 responses
    }
    throw new Error('Invalid JSON response from server');
  }
};

/**
 * Validate API parameters against a schema
 * @param {Object} params - Parameters to validate
 * @param {Object} schema - Validation schema with required fields and types
 * @throws {Error} Validation error if parameters are invalid
 */
const validateParams = (params, schema) => {
  if (!params || typeof params !== 'object') {
    throw new Error('Invalid parameters object');
  }

  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !params[field]) {
      errors.push(`${field} is required`);
    }
    if (params[field] && rules.type && typeof params[field] !== rules.type) {
      errors.push(`${field} must be of type ${rules.type}`);
    }
  }

  if (errors.length > 0) {
    const error = new Error('Validation failed: ' + errors.join(', '));
    error.type = API_ERROR_TYPES.VALIDATION;
    error.details = errors;
    throw error;
  }
};

/**
 * Create request options with proper headers and body formatting
 * @param {string} method - HTTP method
 * @param {Object|FormData} body - Request body
 * @param {string} token - Authentication token
 * @param {Object} options - Additional options
 * @returns {Object} Fetch request options
 */
const createRequestOptions = (method, body, token, options = {}) => {
  // Create a new Headers object
  const headers = new Headers();
  
  // Log token status for debugging
  console.log('Token in createRequestOptions:', token ? 'Present' : 'Missing', { method, url: options.url });

  // Set Authorization header if token exists
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else {
    console.warn('No token provided to createRequestOptions');
  }

  // Add any custom headers from options
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  // Always set Content-Type for non-FormData requests
  if (!(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Create the request options
  const requestOptions = { 
    method, 
    headers,
    credentials: 'include', // This ensures cookies are sent with requests
    // Add sensible defaults for credentials and redirect
    credentials: options.credentials || 'same-origin',
    redirect: options.redirect || 'follow',
  };

  if (body && method !== 'GET') {
    requestOptions.body = body instanceof FormData ? body : JSON.stringify(body);
  }
  
  return requestOptions;
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

  enable2fa: (data, token) =>
    fetch(`${BASE_URL}/api/v1/auth/2fa/enable`, createRequestOptions('POST', data, token))
      .then(handleResponse),

  disable2fa: (body, token) =>
    fetch(`${BASE_URL}/api/v1/auth/2fa/disable`, createRequestOptions('POST', body, token))
      .then(handleResponse),

  // add in api.auth
verify2fa: (data, token) => fetch(`${BASE_URL}/api/v1/auth/2fa/verify`, createRequestOptions('POST', data, token)).then(handleResponse),
    
  loginVerify2fa: (verificationData) =>
    fetch(`${BASE_URL}/api/v1/auth/2fa/login-verify`, createRequestOptions('POST', verificationData))
      .then(handleResponse),
      
  me: async (token) => {
    if (!token) {
      throw new Error('Invalid or missing token');
    }
    const response = await fetch(`${BASE_URL}/api/v1/me`, createRequestOptions('GET', null, token));
    const data = await handleResponse(response);
    if (!data) {
      throw new Error('Invalid response from server');
    }
    return data.user || data; // Handle both { user: {...} } and direct user object responses
  },

  // Session Management
  sessions: {
    list: (token) =>
      fetch(`${BASE_URL}/api/v1/auth/sessions`, createRequestOptions('GET', null, token))
        .then(handleResponse)
        .then(response => ({
          sessions: Array.isArray(response.items) ? response.items : response.sessions || []
        })),

    revoke: (sessionId, token) =>
      fetch(`${BASE_URL}/api/v1/auth/sessions/${sessionId}`, createRequestOptions('DELETE', null, token))
        .then(handleResponse),

    revokeAll: (token) =>
      fetch(`${BASE_URL}/api/v1/auth/sessions`, createRequestOptions('DELETE', null, token))
        .then(handleResponse),
  },

  // 2FA Backup Codes
  backupCodes: (token) =>
    fetch(`${BASE_URL}/api/v1/auth/2fa/backup-codes`, createRequestOptions('GET', null, token))
      .then(handleResponse),
};

// Accounts API functions
export const accounts = {
  /**
   * Get all accounts for the authenticated user
   * @param {string} token - Authentication token
   * @returns {Promise<Array>} List of user accounts
   */
  getAccountsList: (token) =>
    fetch(`${BASE_URL}/api/v1/accounts`, createRequestOptions('GET', null, token))
      .then(handleResponse),
  
  /**
   * Get account summary information
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Account summary data
   */
  getAccountSummary: (token) =>
    fetch(`${BASE_URL}/api/v1/accounts/summary`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  /**
   * Get detailed information for a specific account
   * @param {string} accountId - ID of the account to fetch
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Account details
   */
  getAccountDetails: (accountId, token) =>
    fetch(`${BASE_URL}/api/v1/accounts/${accountId}`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  getStatements: (params, token) => {
    let url = `${BASE_URL}/api/v1/statements`;
    if (params) {
      url += '?' + new URLSearchParams(params).toString();
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
      
  searchAccounts: (searchTerm, token) => {
    const cleanTerm = searchTerm?.trim();
    console.log('Making API request with term:', cleanTerm, 'length:', cleanTerm?.length); // Detailed debug

    // Don't even make the request if term is too short
    if (!cleanTerm || cleanTerm.length < 4) {
      return Promise.reject(new Error('Search term must be at least 4 characters'));
    }

    return fetch(
      `${BASE_URL}/api/v1/accounts/search?term=${encodeURIComponent(cleanTerm)}`, 
      createRequestOptions('GET', null, token)
    ).then(handleResponse);
  },
};

// Transfers API functions
export const transfers = {
  initiateTransfer: async (transferData, token, options = {}) => {
    if (!token) {
      throw new Error('Authentication token is required for transfer initiation');
    }

    // Create request options with explicit token handling
    const requestOptions = createRequestOptions('POST', transferData, token, {
      ...options,
      url: '/api/v1/transfer' // Add URL for logging purposes
    });

    // Log the final request configuration
    console.log('Transfer request configuration:', {
      url: `${BASE_URL}/api/v1/transfer`,
      method: 'POST',
      hasToken: !!token,
      hasHeaders: !!requestOptions.headers,
      headerKeys: [...requestOptions.headers.keys()]
    });

    const response = await fetch(`${BASE_URL}/api/v1/transfer`, requestOptions);
    return handleResponse(response);
  },

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
    fetch(`${BASE_URL}/api/v1/scheduled-transfers/${transferId}`, createRequestOptions('DELETE', null, token))
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

  addBeneficiary: async (beneficiaryData, token) => {
    try {
      // Validate required fields
      if (!beneficiaryData.name || !beneficiaryData.account_number || !beneficiaryData.bank_name) {
        throw new Error('Missing required beneficiary fields');
      }

      console.log('Creating beneficiary with data:', beneficiaryData);
      
      const response = await fetch(
        `${BASE_URL}/api/v1/beneficiaries`, 
        createRequestOptions('POST', beneficiaryData, token)
      );

      const data = await handleResponse(response);
      console.log('Beneficiary creation API response:', data);

      // Handle different response formats
      const beneficiary = data.beneficiary || data;
      
      // Validate response
      if (!beneficiary || !beneficiary.id) {
        console.error('Invalid beneficiary response:', data);
        throw new Error('Invalid response format from server');
      }

      return data;
    } catch (err) {
      console.error('Error in addBeneficiary:', err);
      throw err;
    }
  },

  updateBeneficiary: (beneficiaryId, updateData, token) =>
    fetch(`${BASE_URL}/api/v1/beneficiaries/${beneficiaryId}`, createRequestOptions('PUT', updateData, token))
      .then(handleResponse),

  deleteBeneficiary: async (beneficiaryId, token) => {
    const response = await fetch(`${BASE_URL}/api/v1/beneficiaries/${beneficiaryId}`, createRequestOptions('DELETE', null, token));
    if (response.status === 204) {
      return { success: true };
    }
    return handleResponse(response);
  },
};

// Notifications API functions
export const notifications = {
  listNotifications: async (token) => {
    const resp = await fetch(`${BASE_URL}/api/v1/notifications`, createRequestOptions('GET', null, token));
    return handleResponse(resp);
  },

  markNotificationRead: (notificationId, token) =>
    fetch(`${BASE_URL}/api/v1/notifications/${notificationId}/read`, createRequestOptions('POST', null, token))
      .then(handleResponse),
      
  markAllRead: (token) =>
    fetch(`${BASE_URL}/api/v1/notifications/read-all`, createRequestOptions('POST', null, token))
      .then(handleResponse),
      
  // Calculate unread count from the notifications list
  getUnreadCount: async (token) => {
    const resp = await fetch(`${BASE_URL}/api/v1/notifications`, createRequestOptions('GET', null, token));
    const data = await handleResponse(resp);
    const unreadCount = (data?.items || []).filter(n => !n.read).length;
    return { count: unreadCount };
  },
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

// Profile Management API functions
export const profile = {
  getMe: (token) =>
    fetch(`${BASE_URL}/api/v1/me`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  updateMe: (data, token) =>
    fetch(`${BASE_URL}/api/v1/me`, createRequestOptions('PUT', data, token))
      .then(handleResponse),
};

// Notification Preferences API functions
export const notificationPrefs = {
  get: (token) =>
    fetch(`${BASE_URL}/api/v1/notification-preferences`, createRequestOptions('GET', null, token))
      .then(handleResponse),

  update: (data, token) =>
    fetch(`${BASE_URL}/api/v1/notification-preferences`, createRequestOptions('PUT', data, token))
      .then(handleResponse),
};

/**
 * Transactions API Schema
 */
const TRANSACTIONS_SCHEMA = {
  getTransactions: {
    accountId: { type: 'string', required: true },
    page: { type: 'number', required: false, description: 'Page number for pagination (1-based indexing)' },
    pageSize: { type: 'number', required: false, description: 'Number of items per page' },
    type: { type: 'string', required: false, description: 'Transaction type: credit, debit, or transfer' },
    status: { type: 'string', required: false, description: 'Transaction status: completed, pending, or failed' },
    startDate: { type: 'string', required: false, description: 'Start date in ISO format' },
    endDate: { type: 'string', required: false, description: 'End date in ISO format' },
  }
};

/**
 * Transactions API functions with enhanced validation and error handling
 */
export const transactions = {
  /**
   * Get transactions with optional filtering and validation
   * @param {Object} params - Query parameters for filtering
   * @param {string} params.accountId - Filter by account ID
   * @param {number} params.page - Page number for pagination
   * @param {number} params.pageSize - Number of items per page
   * @param {string} params.type - Filter by transaction type
   * @param {string} params.status - Filter by transaction status
   * @param {string} params.startDate - Filter by start date (ISO string)
   * @param {string} params.endDate - Filter by end date (ISO string)
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Paginated list of transactions
   * @throws {Error} Validation or API error
   */
  getTransactions: (params, token) => {
    validateParams(params, TRANSACTIONS_SCHEMA.getTransactions);

    let url = `${BASE_URL}/api/v1/transactions`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    return fetch(url, createRequestOptions('GET', null, token)).then(handleResponse);
  },

  /**
   * Get details for a specific transaction
   * @param {string} transactionId - ID of the transaction to fetch
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Transaction details
   * @throws {Error} API error with type and details
   */
  getTransactionDetails: (transactionId, token) => {
    if (!transactionId) {
      const error = new Error('Transaction ID is required');
      error.type = API_ERROR_TYPES.VALIDATION;
      throw error;
    }

    return fetch(
      `${BASE_URL}/api/v1/transactions/${transactionId}`, 
      createRequestOptions('GET', null, token)
    ).then(handleResponse);
  },

  /**
   * Get recent transactions for quick display
   * @param {string} accountId - Account ID to fetch transactions for
   * @param {number} limit - Maximum number of transactions to return
   * @param {string} token - Authentication token
   * @returns {Promise<Array>} List of recent transactions
   */
  getRecentTransactions: (accountId, limit = 5, token) => {
    validateParams({ accountId, limit }, {
      accountId: { type: 'string', required: true },
      limit: { type: 'number', required: true }
    });

    return fetch(
      `${BASE_URL}/api/v1/transactions?accountId=${accountId}&pageSize=${limit}&sort=date:desc`,
      createRequestOptions('GET', null, token)
    ).then(handleResponse);
  },

  /**
   * Search transactions with text-based filtering
   * @param {Object} params - Search parameters
   * @param {string} params.accountId - Account ID to search in
   * @param {string} params.searchText - Text to search for
   * @param {string} token - Authentication token
   * @returns {Promise<Array>} Matching transactions
   */
  searchTransactions: (params, token) => {
    validateParams(params, {
      accountId: { type: 'string', required: true },
      searchText: { type: 'string', required: true }
    });

    return fetch(
      `${BASE_URL}/api/v1/transactions?accountId=${params.accountId}&search=${encodeURIComponent(params.searchText)}`,
      createRequestOptions('GET', null, token)
    ).then(handleResponse);
  },

  /**
   * Get transactions within a date range
   * @param {Object} params - Range parameters
   * @param {string} params.accountId - Account ID
   * @param {string} params.startDate - Start date (ISO string)
   * @param {string} params.endDate - End date (ISO string)
   * @param {string} token - Authentication token
   * @returns {Promise<Array>} Transactions within range
   */
  getTransactionsByDateRange: (params, token) => {
    validateParams(params, {
      accountId: { type: 'string', required: true },
      startDate: { type: 'string', required: true },
      endDate: { type: 'string', required: true }
    });

    return fetch(
      `${BASE_URL}/api/v1/transactions?accountId=${params.accountId}&startDate=${params.startDate}&endDate=${params.endDate}`,
      createRequestOptions('GET', null, token)
    ).then(handleResponse);
  }
};

/**
 * Limits API Schema
 */
const LIMITS_SCHEMA = {
  getLimits: {
    accountId: { type: 'string', required: true }
  },
  submitLimitRequest: {
    accountId: { type: 'string', required: true },
    dailyLimit: { type: 'number', required: true },
    monthlyLimit: { type: 'number', required: true },
    reason: { type: 'string', required: true }
  }
};

/**
 * Limits API functions with enhanced validation and error handling
 */
export const limits = {
  /**
   * Get current limits for an account
   * @param {Object} params - Query parameters
   * @param {string} params.accountId - Account ID to get limits for
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Current account limits
   * @throws {Error} Validation or API error with type and details
   */
  getLimits: (params, token) => {
    // Validate required parameters
    validateParams(params, LIMITS_SCHEMA.getLimits);

    // Ensure we use the correct parameter name (accountId)
    const queryParams = params ? { ...params } : {};
    if (queryParams.account_id) {
      queryParams.accountId = queryParams.account_id;
      delete queryParams.account_id;
    }
    
    const url = `${BASE_URL}/api/v1/limits${queryParams ? `?${new URLSearchParams(queryParams)}` : ''}`;
    return fetch(url, createRequestOptions('GET', null, token))
      .then(handleResponse)
      .then(response => response.limits || response);
  },

  /**
   * Submit a new limit increase request
   * @param {Object} data - Request data
   * @param {string} data.accountId - Account ID
   * @param {number} data.dailyLimit - Requested daily limit
   * @param {number} data.monthlyLimit - Requested monthly limit
   * @param {string} data.reason - Reason for the increase
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Created limit request
   * @throws {Error} Validation or API error with type and details
   */
  submitLimitRequest: (data, token) => {
    // Validate request data
    validateParams(data, LIMITS_SCHEMA.submitLimitRequest);

    return fetch(
      `${BASE_URL}/api/v1/limit-requests`, 
      createRequestOptions('POST', data, token)
    ).then(handleResponse);
  },

  /**
   * Get all limit requests for the user
   * @param {string} token - Authentication token
   * @returns {Promise<Array>} List of limit requests
   * @throws {Error} API error with type and details
   */
  getLimitRequests: (token) => {
    return fetch(
      `${BASE_URL}/api/v1/limit-requests`, 
      createRequestOptions('GET', null, token)
    )
    .then(handleResponse)
    .then(response => {
      // Log the full response for debugging
      console.log('Full limit requests response:', response);
      
      // Handle both array and object response formats
      if (Array.isArray(response)) {
        return response;
      } else if (response.limit_requests) {
        return response.limit_requests;
      } else if (response.items) {
        return response.items;
      } else {
        console.warn('Unexpected response format:', response);
        return [];
      }
    });
  },

  /**
   * Get the current limits for a specific account with better error handling
   * @param {string} accountId - Account ID to get limits for
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Current account limits
   * @throws {Error} Validation or API error with type and details
   */
  getCurrentLimits: (accountId, token) => {
    if (!accountId) {
      const error = new Error('Account ID is required');
      error.type = API_ERROR_TYPES.VALIDATION;
      throw error;
    }

    return fetch(
      `${BASE_URL}/api/v1/limits?accountId=${accountId}`,
      createRequestOptions('GET', null, token)
    )
    .then(handleResponse)
    .then(response => response.limits || response);
  },

  /**
   * Check if a transaction amount is within account limits
   * @param {Object} params - Check parameters
   * @param {string} params.accountId - Account ID to check
   * @param {number} params.amount - Transaction amount to check
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Limit check result
   */
  checkLimitAvailability: async (params, token) => {
    validateParams(params, {
      accountId: { type: 'string', required: true },
      amount: { type: 'number', required: true }
    });

    const limits = await limits.getCurrentLimits(params.accountId, token);
    
    return {
      withinDailyLimit: (limits.daily_used + params.amount) <= limits.daily_limit,
      withinMonthlyLimit: (limits.monthly_used + params.amount) <= limits.monthly_limit,
      dailyRemaining: limits.daily_limit - limits.daily_used,
      monthlyRemaining: limits.monthly_limit - limits.monthly_used
    };
  },

  /**
   * Get the status of a specific limit request
   * @param {string} requestId - Limit request ID to check
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Limit request status
   */
  getLimitRequestStatus: (requestId, token) => {
    if (!requestId) {
      const error = new Error('Request ID is required');
      error.type = API_ERROR_TYPES.VALIDATION;
      throw error;
    }

    return fetch(
      `${BASE_URL}/api/v1/limit-requests/${requestId}`,
      createRequestOptions('GET', null, token)
    ).then(handleResponse);
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
  notificationPrefs,
  profile,
  admin,
  transactions,
  limits,
};