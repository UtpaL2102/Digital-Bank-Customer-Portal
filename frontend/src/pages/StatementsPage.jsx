// src/pages/StatementsPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import "../StatementsPage.css";

export default function StatementsPage() {
  const location = useLocation();
  const showHeader = location.state?.fromDashboard || false;
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingStatement, setGeneratingStatement] = useState(false);
  const [downloadingStatement, setDownloadingStatement] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  // Helper function for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Data states
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [statements, setStatements] = useState([]);

  // Initialize data structures
  useEffect(() => {
    if (!Array.isArray(accounts)) {
      setAccounts([]);
    }
    if (!Array.isArray(statements)) {
      setStatements([]);
    }
  }, [accounts, statements]);
  
  // Form states
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    format: "PDF",
    delivery: "download" // 'download', 'email', 'both'
  });

  // Success/error message states
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  // Initial data fetching
  useEffect(() => {
    const fetchData = async () => {
      if (initialized) return;

      const token = getAuthToken();
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Parallel fetch of accounts and statements
        const [accountsResponse, statementsResponse] = await Promise.all([
          api.accounts.getAccountsList(token),
          api.accounts.getStatements({}, token)
        ]);

        // Process accounts
        const accountsData = Array.isArray(accountsResponse) ? accountsResponse : 
                           (accountsResponse?.items || accountsResponse?.accounts || []);
        
        const validAccounts = accountsData.filter(acc => acc && acc.id);
        setAccounts(validAccounts);
        
        if (validAccounts.length > 0) {
          setSelectedAccount(validAccounts[0]);
        }

        // Process statements
        const statementsData = Array.isArray(statementsResponse) ? statementsResponse :
                             (statementsResponse?.items || statementsResponse?.data || []);
        setStatements(statementsData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Error loading data');
        setAccounts([]);
        setStatements([]);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    fetchData();
  }, [initialized]);  // Form handlers and utility functions
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setFormError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    if (!selectedAccount) {
      setFormError("Please select an account");
      return false;
    }
    if (!formData.fromDate) {
      setFormError("Please select a start date");
      return false;
    }
    if (!formData.toDate) {
      setFormError("Please select an end date");
      return false;
    }
    if (new Date(formData.fromDate) > new Date(formData.toDate)) {
      setFormError("Start date must be before end date");
      return false;
    }
    // If there's an amount field, validate it according to INR standards
    if (formData.amount && (parseFloat(formData.amount) <= 0 || parseFloat(formData.amount) > 10000000)) {
      setFormError("Amount must be between ₹1 and ₹1,00,00,000");
      return false;
    }
    return true;
  };

  const generateStatement = async () => {
    if (!validateForm()) return;

    const token = getAuthToken();
    if (!token) {
      setFormError("Authentication required");
      return;
    }

    try {
      setGeneratingStatement(true);
      setFormError("");
      
      const statementData = {
        accountId: selectedAccount.id,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        format: formData.format,
        delivery: formData.delivery
      };

      await api.accounts.generateStatement(statementData, token);
      
      // Refresh statements list
      const response = await api.accounts.getStatements({
        accountId: selectedAccount.id
      }, token);
      setStatements(response.items || []);
      
      setSuccessMessage("Statement generation initiated successfully");
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        fromDate: "",
        toDate: ""
      }));
    } catch (err) {
      setFormError(err.message || "Failed to generate statement");
      console.error('Statement generation failed:', err);
    } finally {
      setGeneratingStatement(false);
    }
  };

  const handleDownload = async (statement) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setDownloadingStatement(statement.id);
      
      // Step 1: Get download token
      const { token: downloadToken } = await api.accounts.getStatementDownloadToken(statement.id, token);
      
      // Step 2: Get signed URL
      const { url: signedUrl } = await api.accounts.getStatementSignedUrl(statement.id, downloadToken, token);
      
      // Step 3: Open download in new tab
      window.open(signedUrl, '_blank');
    } catch (err) {
      console.error('Download failed:', err);
      setError("Failed to download statement: " + err.message);
    } finally {
      setDownloadingStatement(null);
    }
  };

  const handleEmailDelivery = () => {
    setFormData(prev => ({
      ...prev,
      delivery: prev.delivery === 'email' ? 'download' : 'email'
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {showHeader && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Digital Bank</h1>
          </div>
        </header>
      )}

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Statements</h2>
          </div>

          {/* Generate Statement Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            {formError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {formError}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                {successMessage}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
              <div className="lg:col-span-2">
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                    account_balance_wallet
                  </span>
                  <select
                    className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none"
                    value={selectedAccount?.id || ""}
                    onChange={(e) => {
                      const account = (accounts || []).find(a => a.id === e.target.value);
                      setSelectedAccount(account);
                    }}
                    disabled={loading || !accounts?.length}
                  >
                    {!accounts?.length ? (
                      <option value="">No accounts available</option>
                    ) : (
                      (accounts || []).map(account => {
                        const lastFourDigits = account?.accountNumber ? 
                          account.accountNumber.slice(-4) : 'XXXX';
                        const accountType = account?.type || 'Account';
                        
                        return (
                          <option key={account.id} value={account.id}>
                            {accountType} •••• {lastFourDigits}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>

              <div>
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">date_range</span>
                  <input
                    className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none"
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => handleFormChange('fromDate', e.target.value)}
                    placeholder="From date"
                    max={formData.toDate || undefined}
                  />
                </div>
              </div>

              <div>
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">date_range</span>
                  <input
                    className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none"
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => handleFormChange('toDate', e.target.value)}
                    placeholder="To date"
                    min={formData.fromDate || undefined}
                  />
                </div>
              </div>

              <div>
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">description</span>
                  <select
                    className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none"
                    value={formData.format}
                    onChange={(e) => handleFormChange('format', e.target.value)}
                  >
                    <option value="PDF">Format: PDF</option>
                    <option value="CSV">Format: CSV</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-1 grid grid-cols-2 gap-2">
                <button
                  onClick={generateStatement}
                  disabled={generatingStatement}
                  className="w-full col-span-2 md:col-span-1 lg:col-span-2 btn-primary text-white font-semibold py-2.5 px-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingStatement ? (
                    <>
                      <span className="material-icons animate-spin mr-2">refresh</span>
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
                <button
                  onClick={handleEmailDelivery}
                  disabled={generatingStatement}
                  className={`w-full col-span-2 md:col-span-1 lg:col-span-2 font-semibold py-2.5 px-4 rounded-full transition-colors duration-300
                    ${formData.delivery === 'email' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  Email copy to me
                </button>
              </div>
            </div>
          </div>

          {/* Statements Table Card */}
          <div className="table-card overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Generated statements</h3>
            </div>

            {loading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ) : error ? (
              <div className="p-6 text-red-600">
                Error loading statements: {error}
              </div>
            ) : statements.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No statements found for this account.
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date range</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {statements.map((statement) => (
                        <tr key={statement.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {new Date(statement.fromDate).toLocaleDateString()} → {new Date(statement.toDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {statement.amount ? formatCurrency(statement.amount) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {statement.format}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {statement.delivery === 'both' ? 'Email + Download' : 
                             statement.delivery.charAt(0).toUpperCase() + statement.delivery.slice(1)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${statement.status === "Completed" ? "bg-green-100 text-green-800" : 
                                statement.status === "Failed" ? "bg-red-100 text-red-800" :
                                "bg-orange-100 text-orange-800"}`}>
                              {statement.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {statement.status === "Completed" ? (
                              <button
                                onClick={() => handleDownload(statement)}
                                disabled={downloadingStatement === statement.id}
                                className="text-indigo-600 hover:text-indigo-900 flex items-center group disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {downloadingStatement === statement.id ? (
                                  <span className="material-icons mr-1 text-lg animate-spin">refresh</span>
                                ) : (
                                  <span className="material-icons mr-1 text-lg group-hover:text-indigo-900">file_download</span>
                                )}
                                Get {statement.format}
                              </button>
                            ) : (
                              <span className="text-gray-400">
                                {statement.status === "Failed" ? "Generation failed" : "Generating..."}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4 p-4">
                  {statements.map((statement) => (
                    <div key={statement.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(statement.fromDate).toLocaleDateString()} → {new Date(statement.toDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {statement.format} • {statement.delivery === 'both' ? 'Email + Download' : 
                              statement.delivery.charAt(0).toUpperCase() + statement.delivery.slice(1)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full
                          ${statement.status === "Completed" ? "bg-green-100 text-green-800" : 
                            statement.status === "Failed" ? "bg-red-100 text-red-800" :
                            "bg-orange-100 text-orange-800"}`}>
                          {statement.status}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        {statement.status === "Completed" ? (
                          <button
                            onClick={() => handleDownload(statement)}
                            disabled={downloadingStatement === statement.id}
                            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="material-icons mr-2 text-lg">
                              {downloadingStatement === statement.id ? "refresh" : "file_download"}
                            </span>
                            {downloadingStatement === statement.id ? "Preparing download..." : `Download ${statement.format}`}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white cursor-not-allowed"
                          >
                            <span className="material-icons mr-2 text-lg">
                              {statement.status === "Failed" ? "error_outline" : "hourglass_empty"}
                            </span>
                            {statement.status === "Failed" ? "Generation failed" : "Generating..."}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
