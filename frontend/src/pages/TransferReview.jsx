import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { transfers } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import { formatCurrency } from "../lib/currencyHelpers";
import { CircularProgress, Alert } from "@mui/material";
import "../TransferReview.css";

export default function TransferReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Generate a unique idempotency key
  const [idempotencyKey] = useState(() => crypto.randomUUID?.() || Date.now().toString());
  const [transferData, setTransferData] = useState(null);

  // Validate and load transfer data
  useEffect(() => {
    const loadTransferData = () => {
      // Try to get data from location state first
      let data = location.state;

      // If no location state, try session storage
      if (!data) {
        try {
          const savedData = sessionStorage.getItem('transferData');
          if (savedData) {
            data = JSON.parse(savedData);
            // Check if data is still valid (30 min expiry)
            const timestamp = new Date(data.timestamp);
            const now = new Date();
            if ((now.getTime() - timestamp.getTime()) > 30 * 60 * 1000) {
              sessionStorage.removeItem('transferData');
              throw new Error("Transfer session expired. Please start over.");
            }
          }
        } catch (err) {
          console.error('Error loading saved transfer data:', err);
          setError("Invalid transfer data. Please start over.");
          return;
        }
      }

      // Validate required fields
      if (!data) {
        setError("Missing transfer details. Please start over.");
        return;
      }

      const { fromAccount, toBeneficiary, amount, description } = data;
      
      console.log('Validating transfer data:', {
        fromAccount,
        toBeneficiary,
        amount,
        description
      });

      const missingFields = [];
      // Check fromAccount structure considering nested account object
      if (!fromAccount?.account?.id) missingFields.push('Source account');
      if (!toBeneficiary?.id) missingFields.push('Beneficiary');
      if (!amount) missingFields.push('Amount');
      if (!description?.trim()) missingFields.push('Description');
      
      if (missingFields.length > 0) {
        console.error('Missing required transfer fields:', {
          fromAccount,
          toBeneficiary,
          amount,
          description,
          missingFields
        });
        setError(`Incomplete transfer details. Missing: ${missingFields.join(', ')}`);
        
        // Try to recover the data if possible
        const recoveredData = {
          ...data,
          fromAccount: fromAccount || location.state?.fromAccount,
          toBeneficiary: toBeneficiary || location.state?.toBeneficiary,
          amount: amount || location.state?.amount,
          description: description || location.state?.description
        };

        // Check if we recovered enough data
        if (recoveredData.fromAccount?.id && 
            recoveredData.toBeneficiary?.id && 
            recoveredData.amount && 
            recoveredData.description?.trim()) {
          console.log('Recovered transfer data:', recoveredData);
          setTransferData(recoveredData);
          return;
        }

        return;
      }

      // All good - update state
      setTransferData(data);
      
      // Save to session storage with fresh timestamp
      sessionStorage.setItem('transferData', JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }));
    };

    loadTransferData();
  }, [location.state]);

  // Check authentication on component mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login', { state: { from: location.pathname, message: 'Please log in to continue with your transfer.' } });
    }
  }, [navigate, location.pathname]);

  // Execute the transfer
  const handleConfirm = async () => {
    try {
      if (!transferData) {
        throw new Error("Transfer details not loaded. Please try again.");
      }

      setLoading(true);
      setError(null);

      const token = getAuthToken();
      if (!token) {
        setError("Your session has expired. Please log in again.");
        navigate('/login', { 
          state: { 
            from: location.pathname,
            message: 'Your session has expired. Please log in to complete your transfer.'
          } 
        });
        return;
      }

      // Log token presence for debugging
      console.log('Token status:', token ? 'Present' : 'Missing');

      const {
        fromAccount,
        toBeneficiary,
        amount,
        description,
        schedule,
        deliveryDate
      } = transferData;

      // Construct the transfer payload
      const transferPayload = {
        from_account_id: fromAccount.account.id,
        to_beneficiary_id: toBeneficiary.id,
        amount: Number(amount),  // Ensure amount is a number
        description: description.trim(),
        schedule_at: schedule === "scheduled" ? deliveryDate : null,
        type: 'transfer'  // Explicitly set transfer type
      };

      // Validate token again just before the request
      const currentToken = getAuthToken();
      if (!currentToken) {
        throw new Error('Authentication token is missing. Please log in again.');
      }

      // Log the request for debugging
      console.log('Initiating transfer:', {
        payload: transferPayload,
        tokenPresent: !!currentToken,
        idempotencyKey
      });

      // Make the transfer request with explicit token handling
      const result = await transfers.initiateTransfer(
        transferPayload,
        currentToken,
        {
          headers: {
            'Idempotency-Key': idempotencyKey,
            'Authorization': `Bearer ${currentToken}`
          }
        }
      );

      if (!result) {
        throw new Error('No response received from transfer service');
      }

      // Log the API response
      console.log('Transfer API response:', result);

      // Extract transaction data from response
      const transaction = result.transaction;
      
      if (!transaction || !transaction.id) {
        console.error('Invalid transaction response:', result);
        throw new Error('Invalid response from transfer service');
      }

      // Create confirmation object with proper validation
      const confirmation = {
        transactionId: transaction.id,
        amount: Number(transaction.amount),
        description: transaction.description,
        fromAccount: {
          account_type: fromAccount.account?.account_type || 'Account',
          account_number: transaction.fromAccount?.account_number || fromAccount.account?.account_number || 'N/A',
          id: transaction.from_account_id
        },
        toBeneficiary: {
          name: transaction.toBeneficiary?.name || toBeneficiary?.name || 'Beneficiary',
          account_number: transaction.toBeneficiary?.account_number || toBeneficiary?.account_number || 'N/A',
          bank_name: toBeneficiary?.bank_name || 'Bank',
          id: transaction.to_beneficiary_id
        },
        scheduledAt: transaction.scheduled_at || null,
        status: transaction.status,
        confirmedAt: transaction.created_at,
        reference: transaction.id,
        type: transaction.type || 'transfer'
      };

      // Validate the confirmation object before proceeding
      const requiredFields = ["transactionId", "amount", "fromAccount", "toBeneficiary", "status"];
      const missingFields = requiredFields.filter(field => !confirmation[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Invalid confirmation data. Missing: ${missingFields.join(", ")}`);
      }

      // Store in session storage with timestamp
      sessionStorage.setItem('last_transfer', JSON.stringify({
        ...confirmation,
        timestamp: new Date().toISOString()
      }));

      // Navigate to success with transfer details
      navigate("/transfer-success", { 
        state: confirmation,
        replace: true  // Replace the current route to prevent back navigation
      });
    } catch (err) {
      console.error("Transfer failed:", err);
      setError(err.message || "Failed to execute transfer. Please try again.");
      setLoading(false);
    }
  };

  if (error || !transferData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Alert severity="error" className="mb-4">
          {error || "Missing transfer details. Please start over."}
        </Alert>
        <button
          className="btn btn-primary"
          onClick={() => {
            // Clear any stale data
            sessionStorage.removeItem('transferData');
            navigate("/transfer");
          }}
        >
          Start Over
        </button>
      </div>
    );
  }

  const { fromAccount, toBeneficiary, amount, description, schedule, deliveryDate } = transferData;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Digital Bank</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">New transfer</h2>

        {/* Progress Bar */}
        <div className="mb-10 flex items-center justify-center lg:justify-start">
          <div className="flex items-center space-x-2 bg-gray-200 rounded-full p-1 text-sm">
            <div className="px-4 py-1.5 rounded-full text-gray-500">From/To</div>
            <span className="text-gray-400">→</span>
            <div className="px-4 py-1.5 rounded-full text-gray-500">Details</div>
            <span className="text-gray-400">→</span>
            <div className="px-4 py-1.5 rounded-full gradient-bg text-white font-semibold shadow-md">
              Review
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Please review</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1">From</p>
                <p className="font-medium text-gray-900">
                  {fromAccount?.account?.account_type || 'N/A'} •••• {fromAccount?.account?.account_number?.slice(-4) || 'XXXX'} — {formatCurrency(fromAccount?.account?.balance || 0)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Amount</p>
                <p className="font-medium text-gray-900">{formatCurrency(amount)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">To</p>
                <p className="font-medium text-gray-900">
                  {toBeneficiary.name} - •••• {toBeneficiary.account_number.slice(-4)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Schedule</p>
                <p className="font-medium text-gray-900">
                  {schedule === "scheduled" ? `Scheduled for ${deliveryDate}` : "Now"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-500 mb-1">Description</p>
                <p className="font-medium text-gray-900">{description}</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="border-r border-gray-200 pr-4">
                <p className="text-gray-500 mb-1">Fee</p>
                <p className="font-medium text-gray-900">{formatCurrency(0)}</p>
              </div>
              <div className="md:border-r md:border-gray-200 md:pr-4">
                <p className="text-gray-500 mb-1">Estimated arrival</p>
                <p className="font-medium text-gray-900">
                  {schedule === "scheduled" ? deliveryDate : "Instant"}
                </p>
              </div>
              <div className="border-r border-gray-200 pr-4">
                <p className="text-gray-500 mb-1">Bank</p>
                <p className="font-medium text-gray-900">{toBeneficiary.bank_name}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Idempotency key</p>
                <p className="font-medium text-gray-900 truncate" title={idempotencyKey}>
                  {idempotencyKey.substring(0, 8)}...
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6">
                <Alert severity="error">{error}</Alert>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4">
              <button
                type="button"
                className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Back
              </button>
              <button
                type="button"
                className="confirm-btn w-full sm:w-auto px-6 py-3 rounded-lg gradient-bg text-white font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    <span className="btn-text">Confirm</span>
                    <span className="material-icons check-icon">check</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center bg-blue-50 text-blue-800 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2">verified_user</span> Double-charge protected
              </div>
              <div className="flex items-center bg-blue-50 text-blue-800 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2">verified</span> Verified beneficiary
              </div>
              <div className="flex items-center bg-blue-50 text-blue-800 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2">notifications_active</span> Email confirmation
              </div>
              {toBeneficiary.bank_name !== "Digital Bank" && (
                <div className="flex items-center bg-orange-100 text-orange-600 rounded-full px-4 py-2">
                  <span className="material-icons text-base mr-2 text-orange-500">schedule</span> May take 1-2 days
                </div>
              )}
              <div className="flex items-center bg-orange-100 text-orange-600 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2 text-orange-500">warning</span> Transfer is final
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
