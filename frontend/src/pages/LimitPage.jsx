// src/pages/LimitPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import { getAuthToken, clearAuthTokens } from "../lib/authHelpers";
import WithAuth from "../components/WithAuth";

// Wrap component in auth check and export
const WrappedLimitPage = () => {
  return (
    <WithAuth>
      <LimitPage />
    </WithAuth>
  );
};

export default WrappedLimitPage;

function LimitPage() {
  // State management
  const [limits, setLimits] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [limitRequests, setLimitRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    account_id: '',
    requested_daily_limit: '',
    requested_monthly_limit: '',
    reason: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Derived values
  const currentDailyRemaining = limits ? limits.daily_limit - limits.daily_used : 0;
  const currentMonthlyRemaining = limits ? limits.monthly_limit - limits.monthly_used : 0;

  // Load accounts and set initial account
  const loadAccounts = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await api.accounts.getAccountsList(token);
      const accountsList = response.accounts || [];
      setAccounts(accountsList);
      
      if (accountsList.length > 0 && !selectedAccountId) {
        setSelectedAccountId(accountsList[0].id);
        setFormData(prev => ({ ...prev, account_id: accountsList[0].id }));
      }
    } catch (err) {
      console.error("Failed to load accounts:", err);
      if (err.message?.includes('401') || err.message?.includes('token')) {
        clearAuthTokens();
        window.location.href = '/login';
        return;
      }
      setError("Failed to load accounts. Please try again.");
    }
  }, [selectedAccountId]);

  // Load limits for selected account
  const loadLimits = useCallback(async () => {
    if (!selectedAccountId) return;

    try {
      setLoading(true);
      setError("");
      const token = getAuthToken();
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await api.limits.getLimits({ accountId: selectedAccountId }, token);
      
      // Handle both response formats: { limits: {...} } or direct object
      const limitsData = response.limits || response;
      
      // Transform the data to match our state structure if needed
      setLimits({
        daily_limit: limitsData.daily_limit || limitsData.dailyLimit || 0,
        daily_used: limitsData.daily_used || limitsData.dailyUsed || 0,
        monthly_limit: limitsData.monthly_limit || limitsData.monthlyLimit || 0,
        monthly_used: limitsData.monthly_used || limitsData.monthlyUsed || 0
      });
    } catch (err) {
      console.error("Failed to load limits:", err);
      if (err.message?.includes('401') || err.message?.includes('token')) {
        clearAuthTokens();
        window.location.href = '/login';
        return;
      }
      setError("Failed to load account limits. Please try again.");
      setLimits(null);
    } finally {
      setLoading(false);
    }
  }, [selectedAccountId]);

  // Load limit requests history
  const loadLimitRequests = useCallback(async () => {
    try {
      setLoadingRequests(true);
      const token = getAuthToken();
      if (!token) {
        throw new Error('No auth token found');
      }

      const requests = await api.limits.getLimitRequests(token);
      console.log('Loaded limit requests:', requests); // Debug log

      // Ensure we have an array of requests and transform them if needed
      const formattedRequests = (Array.isArray(requests) ? requests : []).map(request => ({
        ...request,
        // Ensure all required fields exist with defaults
        id: request.id,
        created_at: request.created_at || new Date().toISOString(),
        current_daily_limit: request.current_daily_limit || 0,
        current_monthly_limit: request.current_monthly_limit || 0,
        requested_daily_limit: request.requested_daily_limit || 0,
        requested_monthly_limit: request.requested_monthly_limit || 0,
        reason: request.reason || '',
        status: request.status || 'pending',
        decided_at: request.decided_at || null,
        decision_note: request.decision_note || ''
      }));

      setLimitRequests(formattedRequests);
    } catch (err) {
      console.error("Failed to load limit requests:", err);
      if (err.message?.includes('401') || err.message?.includes('token')) {
        clearAuthTokens();
        window.location.href = '/login';
        return;
      }
      setLimitRequests([]); // Reset to empty array on error
    } finally {
      setLoadingRequests(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  // Cleanup timeouts
  useEffect(() => {
    const timeouts = new Set();
    
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess("");
      }, 5000);
      timeouts.add(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [success]);

  useEffect(() => {
    loadLimits();
  }, [loadLimits]);

  useEffect(() => {
    loadLimitRequests();
  }, [loadLimitRequests]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.account_id) {
      errors.account_id = "Please select an account";
    }
    if (!formData.requested_daily_limit) {
      errors.requested_daily_limit = "Please enter a daily limit";
    } else if (isNaN(formData.requested_daily_limit) || formData.requested_daily_limit <= 0) {
      errors.requested_daily_limit = "Daily limit must be a positive number";
    } else if (formData.requested_daily_limit > 1000000) { // Example maximum limit
      errors.requested_daily_limit = "Daily limit cannot exceed ₹10,00,000";
    }
    if (!formData.requested_monthly_limit) {
      errors.requested_monthly_limit = "Please enter a monthly limit";
    } else if (isNaN(formData.requested_monthly_limit) || formData.requested_monthly_limit <= 0) {
      errors.requested_monthly_limit = "Monthly limit must be a positive number";
    } else if (formData.requested_monthly_limit > 5000000) { // Example maximum limit
      errors.requested_monthly_limit = "Monthly limit cannot exceed ₹50,00,000";
    }
    if (Number(formData.requested_monthly_limit) < Number(formData.requested_daily_limit)) {
      errors.requested_monthly_limit = "Monthly limit must be greater than daily limit";
    }
    if (!formData.reason) {
      errors.reason = "Please provide a reason for the limit increase";
    } else if (formData.reason.length < 20) {
      errors.reason = "Please provide a more detailed reason (minimum 20 characters)";
    }
    return errors;
  };

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAccountChange = (e) => {
    const accountId = e.target.value;
    setSelectedAccountId(accountId);
    setFormData(prev => ({ ...prev, account_id: accountId }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      
      const token = getAuthToken();
      if (!token) {
        throw new Error('No auth token found');
      }
      
      // Prepare the request payload with the correct format
      const requestPayload = {
        accountId: selectedAccountId,
        dailyLimit: Number(formData.requested_daily_limit),
        monthlyLimit: Number(formData.requested_monthly_limit),
        reason: formData.reason
      };
      
      console.log('Submitting request:', requestPayload); // Debug log
      
      await api.limits.submitLimitRequest(requestPayload, token);
      
      // Show success message with auto-dismiss
      setSuccess("Limit increase request submitted successfully!");
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      
      // Reset form
      setFormData({
        account_id: selectedAccountId,
        requested_daily_limit: '',
        requested_monthly_limit: '',
        reason: ''
      });
      setFormErrors({});
      
      // Wait a brief moment before refreshing the history
      // This gives the backend time to process the request
      setTimeout(async () => {
        await loadLimitRequests();
      }, 1000);
    } catch (err) {
      console.error("Failed to submit limit request:", err);
      if (err.message?.includes('401') || err.message?.includes('token')) {
        clearAuthTokens();
        window.location.href = '/login';
        return;
      }
      setError("Failed to submit limit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F7FA] flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-lg">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Account Limits</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex items-center">
                <p className="text-sm text-red-600">{error}</p>
                <button
                  type="button"
                  className="ml-4 inline-flex rounded-md px-3 py-1.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => { setError(''); loadLimits(); }}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-600">{success}</p>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => setSuccess("")}
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Limit Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Limits</h2>
          
          {/* Account Selection */}
          <div className="mb-4">
            <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-2">
              Select Account
            </label>
            <select
              id="account"
              name="account_id"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedAccountId}
              onChange={handleAccountChange}
              disabled={loading}
            >
              <option value="">Select an account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.account_number} ({account.account_type})
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </div>
          ) : limits ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Current Daily Remaining</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{currentDailyRemaining.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Used: ₹{limits.daily_used.toLocaleString()} / ₹{limits.daily_limit.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Current Monthly Remaining</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{currentMonthlyRemaining.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Used: ₹{limits.monthly_used.toLocaleString()} / ₹{limits.monthly_limit.toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Select an account to view limits</p>
          )}
        </div>

        {/* Request Limit Increase Form */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Limit Increase</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* New daily limit */}
            <div>
              <label htmlFor="requested_daily_limit" className="block text-sm font-medium text-gray-700 mb-2">
                New daily limit<span className="text-[#FF8040]">*</span>
              </label>
              <div className={`relative rounded-md shadow-sm border ${formErrors.requested_daily_limit ? 'border-[#FF8040] ring-2 ring-[#FF8040]' : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200'} transition-all duration-200`}>
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="material-icons text-gray-400">monetization_on</span>
                </div>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  name="requested_daily_limit"
                  id="requested_daily_limit"
                  placeholder="Enter new daily limit"
                  value={formData.requested_daily_limit}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={submitting}
                />
              </div>
              {formErrors.requested_daily_limit && (
                <p className="mt-2 text-sm text-[#FF8040]">{formErrors.requested_daily_limit}</p>
              )}
            </div>

            {/* New monthly limit */}
            <div>
              <label htmlFor="requested_monthly_limit" className="block text-sm font-medium text-gray-700 mb-2">
                New monthly limit<span className="text-[#FF8040]">*</span>
              </label>
              <div className={`relative rounded-md shadow-sm border ${formErrors.requested_monthly_limit ? 'border-[#FF8040] ring-2 ring-[#FF8040]' : 'border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200'} transition-all duration-200`}>
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="material-icons text-gray-400">calendar_today</span>
                </div>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                  name="requested_monthly_limit"
                  id="requested_monthly_limit"
                  placeholder="Enter new monthly limit"
                  value={formData.requested_monthly_limit}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  disabled={submitting}
                />
              </div>
              {formErrors.requested_monthly_limit && (
                <p className="mt-2 text-sm text-[#FF8040]">{formErrors.requested_monthly_limit}</p>
              )}
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason<span className="text-[#FF8040]">*</span>
              </label>
              <textarea
                name="reason"
                id="reason"
                rows="4"
                placeholder="Please provide a reason for this limit increase..."
                value={formData.reason}
                onChange={handleInputChange}
                className={`block w-full rounded-md border ${formErrors.reason ? 'border-[#FF8040] focus:ring-[#FF8040] focus:border-[#FF8040]' : 'border-gray-300 focus:border-[#0046FF]'} py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,70,255,0.2)] transition-all duration-200`}
                disabled={submitting}
              />
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  A clear reason helps us process your request faster.
                </p>
                <span className="text-sm text-gray-400">
                  {formData.reason.length}/200
                </span>
              </div>
              {formErrors.reason && (
                <p className="mt-1 text-sm text-[#FF8040]">{formErrors.reason}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row-reverse gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto inline-flex justify-center items-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0046FF] focus:ring-offset-2 disabled:opacity-50"
              style={{ backgroundImage: "linear-gradient(to right, #001BB7, #0046FF)" }}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Submitting...
                </>
              ) : "Send Request"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  account_id: selectedAccountId,
                  requested_daily_limit: '',
                  requested_monthly_limit: '',
                  reason: ''
                });
                setFormErrors({});
              }}
              disabled={submitting}
              className="w-full md:w-auto inline-flex justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 py-3 px-8 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Limit Request History */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Request History</h3>
          {loadingRequests ? (
            <div className="flex justify-center items-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </div>
          ) : limitRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Limits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Limits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {limitRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(request.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>Daily: ₹{Number(request.current_daily_limit).toLocaleString()}</div>
                        <div>Monthly: ₹{Number(request.current_monthly_limit).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>Daily: ₹{Number(request.requested_daily_limit).toLocaleString()}</div>
                        <div>Monthly: ₹{Number(request.requested_monthly_limit).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {request.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.decided_at ? (
                          <div>
                            <div>{new Date(request.decided_at).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{request.decision_note || '-'}</div>
                          </div>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No limit requests found</p>
          )}
        </div>
      </div>
    </div>
  );
}
