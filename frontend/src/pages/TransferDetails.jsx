import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { accounts, limits, beneficiaries } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import { formatCurrency } from "../lib/currencyHelpers";
import { CircularProgress, Alert } from "@mui/material";

export default function TransferDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data states
  const [fromAccount, setFromAccount] = useState(null);
  const [toBeneficiary, setToBeneficiary] = useState(null);
  const [accountLimits, setAccountLimits] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    schedule: "now",
    deliveryDate: new Date().toISOString().split('T')[0],
  });
  
  // Validation state
  const [formErrors, setFormErrors] = useState({});

    // Fetch account and beneficiary details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get transfer data from location state first, then session storage
        let transferData = location.state;
        
        if (!transferData?.fromAccountId || !transferData?.toBeneficiaryId) {
          // Try to recover from session storage
          const savedData = sessionStorage.getItem('transferData');
          if (savedData) {
            try {
              transferData = JSON.parse(savedData);
              // Validate timestamp - expire after 30 minutes
              const timestamp = new Date(transferData.timestamp);
              const now = new Date();
              const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
              
              if (timestamp < thirtyMinutesAgo) {
                sessionStorage.removeItem('transferData');
                throw new Error("Transfer session expired. Please start over.");
              }
            } catch (e) {
              sessionStorage.removeItem('transferData');
              throw new Error("Invalid transfer data. Please start over.");
            }
          } else {
            throw new Error("Missing transfer details. Please start over.");
          }
        }

        const token = getAuthToken();
        if (!token) {
          throw new Error("Authentication required. Please log in again.");
        }
        
        // Fetch all required data in parallel
        console.log('Fetching account details for ID:', transferData.fromAccountId);
        const [accountData, beneficiaryList, limitData] = await Promise.all([
          accounts.getAccountDetails(transferData.fromAccountId, token),
          beneficiaries.listBeneficiaries(token),
          limits.getLimits({ accountId: transferData.fromAccountId }, token),
        ]);

        console.log('Account data:', accountData);
        console.log('Limit data:', limitData);

        console.log('Fetched beneficiary list:', beneficiaryList);
        
        // Normalize beneficiary list before searching
        const normalizeList = (resp) => {
          if (Array.isArray(resp)) return resp;
          if (resp?.items) return resp.items;
          if (resp?.beneficiaries) return resp.beneficiaries;
          return [];
        };
        
        const beneficiariesArr = normalizeList(beneficiaryList);
        console.log('Normalized beneficiaries:', beneficiariesArr);
        
        const benef = beneficiariesArr.find(b => b.id === transferData.toBeneficiaryId);
        console.log('Found beneficiary:', benef, 'for ID:', transferData.toBeneficiaryId);
        
        if (!benef) {
          throw new Error("Selected beneficiary not found. Please try again.");
        }

        if (!accountData) {
          throw new Error("Source account details not found. Please try again.");
        }

        if (!limitData) {
          throw new Error("Unable to fetch transfer limits. Please try again.");
        }

        setFromAccount(accountData);
        setToBeneficiary(benef);
        setAccountLimits(limitData);
        setLoading(false);

        // Update session storage with fresh data
        sessionStorage.setItem('transferData', JSON.stringify({
          ...transferData,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        console.error("Error fetching transfer data:", err);
        setError(err.message || "Failed to load transfer details");
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  // Handle form changes
  // Format currency input
  const formatCurrencyInput = (value) => {
    // Remove non-numeric characters
    const number = value.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = number.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
    // Limit decimal places to 2
    if (parts[1]?.length > 2) return parts[0] + '.' + parts[1].slice(0, 2);
    return number;
  };

  // Check limits in real-time
  const checkLimits = (amount) => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return null;

    const errors = [];
    if (value > accountLimits.daily_limit - accountLimits.daily_used) {
      errors.push(`Exceeds daily limit by ${formatCurrency(value - (accountLimits.daily_limit - accountLimits.daily_used))}`);
    }
    if (value > accountLimits.monthly_limit - accountLimits.monthly_used) {
      errors.push(`Exceeds monthly limit by ${formatCurrency(value - (accountLimits.monthly_limit - accountLimits.monthly_used))}`);
    }
    if (value > fromAccount.balance) {
      errors.push(`Exceeds available balance by ${formatCurrency(value - fromAccount.balance)}`);
    }
    return errors.length > 0 ? errors : null;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    // Special handling for amount field
    if (id === 'amount') {
      newValue = formatCurrencyInput(value);
      const limitErrors = checkLimits(newValue);
      setFormErrors(prev => ({
        ...prev,
        amount: limitErrors ? limitErrors.join('\n') : ''
      }));
    }

    setFormData(prev => ({
      ...prev,
      [id]: newValue
    }));

    // Clear non-amount errors when field is modified
    if (id !== 'amount') {
      setFormErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  // Format amount on blur
  const handleAmountBlur = () => {
    if (formData.amount) {
      const value = parseFloat(formData.amount);
      if (!isNaN(value)) {
        setFormData(prev => ({
          ...prev,
          amount: value.toFixed(2)
        }));
      }
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    const amount = parseFloat(formData.amount);

    if (!formData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(amount) || amount <= 0) {
      errors.amount = "Please enter a valid amount";
    } else {
      // Check against limits
      if (amount > accountLimits.daily_limit - accountLimits.daily_used) {
        errors.amount = "Amount exceeds daily limit";
      }
      if (amount > accountLimits.monthly_limit - accountLimits.monthly_used) {
        errors.amount = "Amount exceeds monthly limit";
      }
      if (amount > fromAccount.balance) {
        errors.amount = "Insufficient balance";
      }
    }

    if (!formData.description?.trim()) {
      errors.description = "Description is required";
    }

    if (formData.schedule === "scheduled" && !formData.deliveryDate) {
      errors.deliveryDate = "Delivery date is required";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    navigate("/transfer-review", {
      state: {
        ...location.state,
        amount: parseFloat(formData.amount),
        description: formData.description,
        schedule: formData.schedule,
        deliveryDate: formData.schedule === "scheduled" ? formData.deliveryDate : null,
        fromAccount,
        toBeneficiary,
      }
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 text-gray-900 min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
        <Alert severity="error" className="mb-4">{error}</Alert>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/transfer")}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">New transfer</h2>

          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="progress-step progress-step-inactive">1. From/To</div>
              <div className="progress-line"></div>
              <div className="progress-step progress-step-active">2. Details</div>
              <div className="progress-line"></div>
              <div className="progress-step progress-step-inactive">3. Review</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-6">
              <form onSubmit={handleSubmit}>
                {/* From/To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From account
                    </label>
                    <div className="input-chip flex items-center">
                      <span className="material-icons text-gray-500 mr-3">
                        account_balance
                      </span>
                      <input
                        className="input-field cursor-not-allowed"
                        readOnly
                        value={fromAccount ? `${fromAccount.account_type} **** ${fromAccount.account_number?.slice(-4) || 'XXXX'} — ${formatCurrency(fromAccount.balance)}` : 'Loading...'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To
                    </label>
                    <div className="input-chip flex items-center">
                      <span className="material-icons text-gray-500 mr-3">
                        account_balance_wallet
                      </span>
                      <input
                        className="input-field cursor-not-allowed"
                        readOnly
                        value={toBeneficiary ? `${toBeneficiary.name} - **** ${toBeneficiary.account_number?.slice(-4) || 'XXXX'}` : 'Loading...'}
                      />
                    </div>
                  </div>
                </div>

                {/* Amount and Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="input-chip flex items-center">
                      <span className="material-icons text-gray-500 mr-3">paid</span>
                      <input
                        id="amount"
                        className={`input-field font-semibold ${formErrors.amount ? 'error' : ''}`}
                        type="text"
                        inputMode="decimal"
                        value={formData.amount}
                        onChange={handleChange}
                        onBlur={handleAmountBlur}
                        placeholder="Enter amount"
                      />
                    </div>
                    {formErrors.amount && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.amount}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <div className="input-chip">
                      <input
                        id="description"
                        className={`input-field ${formErrors.description ? 'error' : ''}`}
                        placeholder="Monthly transfer"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                    )}
                  </div>
                </div>

                {/* Schedule and Delivery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule
                    </label>
                    <div className="input-chip flex items-center">
                      <span className="material-icons text-gray-500 mr-3">
                        schedule
                      </span>
                      <select
                        id="schedule"
                        className="input-field"
                        value={formData.schedule}
                        onChange={handleChange}
                      >
                        <option value="now">Now</option>
                        <option value="scheduled">Schedule for later</option>
                      </select>
                    </div>
                  </div>
                  {formData.schedule === "scheduled" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery date
                      </label>
                      <div className="input-chip flex items-center">
                        <span className="material-icons text-gray-500 mr-3">
                          calendar_today
                        </span>
                        <input
                          id="deliveryDate"
                          className={`input-field ${formErrors.deliveryDate ? 'error' : ''}`}
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.deliveryDate}
                          onChange={handleChange}
                        />
                      </div>
                      {formErrors.deliveryDate && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.deliveryDate}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Limit Bar */}
                <div className="bg-gray-100/70 p-4 rounded-lg">
                  {accountLimits ? (
                    <>
                      <div className="limit-bar mb-2 bg-gray-200 h-2 rounded-full">
                        <div 
                          className="limit-progress bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            width: `${Math.min((accountLimits.daily_used / accountLimits.daily_limit) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-gray-600">
                          <span className="font-medium">Daily limit: </span>
                          <span className="font-semibold text-gray-800">
                            {formatCurrency(accountLimits.daily_limit)}
                          </span>
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Used: </span>
                          <span className="font-semibold text-gray-800">
                            {formatCurrency(accountLimits.daily_used)}
                          </span>
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Remaining: </span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(accountLimits.daily_limit - accountLimits.daily_used)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center py-2">
                      <CircularProgress size={24} />
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Review
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section - Summary */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="font-semibold text-gray-800">
                      {fromAccount ? `${fromAccount.account_type} **** ${fromAccount.account_number?.slice(-4) || 'XXXX'}` : 'Loading...'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-semibold text-gray-800">
                      {toBeneficiary ? `${toBeneficiary.name} - **** ${toBeneficiary.account_number?.slice(-4) || 'XXXX'}` : 'Loading...'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formData.amount ? formatCurrency(parseFloat(formData.amount)) : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-semibold text-gray-800">{formatCurrency(0)}</span>
                  </div>
                </div>
              </div>

              {/* Security Tips */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Security tips
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    <span className="material-icons text-sm mr-1.5">info</span>
                    We never ask for your password
                  </div>
                  <div className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    <span className="material-icons text-sm mr-1.5">info</span>
                    Check recipient details carefully
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
