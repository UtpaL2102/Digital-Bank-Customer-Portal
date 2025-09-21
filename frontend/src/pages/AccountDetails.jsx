// src/components/AccountDetails.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatementsPage from "../pages/StatementsPage";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import "../AccountDetails.css";

export default function AccountDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Account data state
  const [accountSummary, setAccountSummary] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  
  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: "Last 30 days",
    type: "All",
    status: "All",
  });

  // Fetch initial account data
  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    const fetchAccountData = async () => {
      setLoading(true);
      try {
        // First get all accounts
        const accountsResponse = await api.accounts.getAccountsList(token);
        
        if (!accountsResponse?.accounts?.length) {
          throw new Error("No accounts found");
        }

        // Get details for the first account
        const accountId = accountsResponse.accounts[0].id;
        const [details, summary] = await Promise.all([
          api.accounts.getAccountDetails(accountId, token),
          api.accounts.getAccountSummary(token)
        ]);

        if (details?.account) {
          setAccountDetails(details.account);
        }
        
        if (summary?.summary) {
          setAccountSummary({
            ...summary.summary,
            recentActivity: {
              totalCredits: summary.summary.credits || 0,
              totalDebits: summary.summary.debits || 0,
              netChange: summary.summary.netChange || 0
            }
          });
        }
      } catch (err) {
        setError(err.message || "Failed to fetch account data");
        console.error('Failed to fetch account data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  // Fetch transactions when filters change
  useEffect(() => {
    const token = getAuthToken();
    if (!token || !accountDetails?.id) return;

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Calculate date range
        const now = new Date();
        let days = 30;
        if (filters.dateRange === "Last 60 days") days = 60;
        if (filters.dateRange === "Last 90 days") days = 90;
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - days + 1);

        // Prepare API parameters
        const params = {
          accountId: accountDetails.id,
          startDate: startDate.toISOString(),
          endDate: now.toISOString(),
          page: 1,     // Convert to number
          pageSize: 20 // Convert to number
        };

        if (filters.type !== "All") {
          params.type = filters.type.toLowerCase();
        }
        if (filters.status !== "All") {
          params.status = filters.status.toLowerCase();
        }

        const response = await api.transactions.getTransactions(params, token);
        if (response?.items) {
          const formattedTransactions = response.items.map(tx => ({
            ...tx,
            date: new Date(tx.date).toISOString(),
            amount: typeof tx.amount === 'string' ? tx.amount : tx.amount.toString(),
            description: tx.description || tx.desc || 'Unknown transaction',
            reference: tx.reference || tx.ref || '-',
            type: tx.type.charAt(0).toUpperCase() + tx.type.slice(1).toLowerCase(),
            status: tx.status.charAt(0).toUpperCase() + tx.status.slice(1).toLowerCase()
          }));
          setTransactions(formattedTransactions);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch transactions");
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filters, accountDetails]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value.startsWith(field + ": ") ? value.replace(field + ": ", "") : value
    }));
  };

  const handleNewTransfer = () => {
    navigate('/transfer-step1');
  };

  const downloadCSV = () => {
    if (!transactions.length) return;

    const headers = ["Date", "Description", "Type", "Status", "Reference", "Amount"];
    const rows = transactions.map(tx => [
      new Date(tx.date).toLocaleDateString(),
      tx.description || tx.desc,
      tx.type,
      tx.status,
      tx.reference || tx.ref,
      tx.amount.startsWith('+') || tx.amount.startsWith('-') ? tx.amount : 
        (tx.type === 'Credit' ? '+' : '-') + tx.amount
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + 
      [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account details</h1>

        {/* Account Summary */}
        {loading && !accountDetails ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-red-600">
            Error loading account details: {error}
          </div>
        ) : accountDetails ? (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {accountDetails.type || 'Account'} •••• {accountDetails.accountNumber ? accountDetails.accountNumber.slice(-4) : 'XXXX'}
              </h2>
              <div className="text-sm text-gray-500 mt-2">
                <p>
                  Status: <span className={`font-medium ${accountDetails.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                    {accountDetails.status || 'Unknown'}
                  </span> • 
                  Opened: {accountDetails.openedDate ? new Date(accountDetails.openedDate).toLocaleDateString() : 'N/A'}
                </p>
                <p>Branch: {accountDetails.branch?.name || 'Main'} ({accountDetails.branch?.code || '001'})</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
                            <p className="text-sm text-gray-500">Available balance</p>
              <p className="text-4xl font-bold">
                ₹{Number(accountDetails.balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <button
                onClick={handleNewTransfer}
                className="gradient-button text-white font-semibold py-2 px-6 rounded-lg mt-4 shadow-sm hover:opacity-90 transition-opacity"
              >
                New transfer
              </button>
            </div>
          </div>
        ) : null}

        {/* Tabs */}
        <div className="bg-gray-100 rounded-full p-1 inline-flex mb-6">
          <button
            className={`pill-tab py-2 px-6 rounded-full ${activeTab === "Overview" ? "active" : "text-gray-500"}`}
            onClick={() => setActiveTab("Overview")}
          >
            Overview
          </button>
          <button
            className={`pill-tab py-2 px-6 rounded-full ${activeTab === "Transactions" ? "active" : "text-gray-500"}`}
            onClick={() => setActiveTab("Transactions")}
          >
            Transactions
          </button>
          <button
            className={`pill-tab py-2 px-6 rounded-full ${activeTab === "Statements" ? "active" : "text-gray-500"}`}
            onClick={() => setActiveTab("Statements")}
          >
            Statements
          </button>
        </div>

        {/* Conditional Rendering Based on Tab */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading && !accountSummary ? (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </>
            ) : error ? (
              <div className="col-span-2 bg-white rounded-xl shadow-md p-6 text-red-600">
                Error loading account overview: {error}
              </div>
            ) : accountSummary ? (
              <>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Credits (30d)</span>
                      <span className="text-green-600 font-semibold">
                        +₹{Number(accountSummary.recentActivity?.totalCredits || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Debits (30d)</span>
                      <span className="text-red-600 font-semibold">
                        -₹{Number(accountSummary.recentActivity?.totalDebits || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-gray-600">Net Change (30d)</span>
                      <span className={`font-semibold ${accountSummary.recentActivity?.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{Number(accountSummary.recentActivity?.netChange || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Type</span>
                      <span className="font-medium">{accountDetails?.type || 'Checking'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-medium">{accountDetails?.interestRate || '0.01'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Fee</span>
                      <span className="font-medium">${Number(accountDetails?.monthlyFee || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Statement</span>
                      <span className="font-medium">
                        {accountSummary.lastStatement?.date ? 
                          new Date(accountSummary.lastStatement.date).toLocaleDateString() : 
                          'Not available'}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}
        {activeTab === "Transactions" && (
          <div>
            {/* Transactions filters and table JSX */}
            <div className="bg-white rounded-xl shadow-md mb-4 p-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Date filter */}
                <div className="relative flex-1">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">calendar_today</span>
                  <select
                    className="input-chip w-full pl-10 pr-4 py-2.5 rounded-lg appearance-none focus:outline-none"
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                  >
                    <option>Last 30 days</option>
                    <option>Last 60 days</option>
                    <option>Last 90 days</option>
                  </select>
                  <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                </div>
                {/* Type filter */}
                <div className="relative flex-1">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">receipt_long</span>
                  <select
                    className="input-chip w-full pl-10 pr-4 py-2.5 rounded-lg appearance-none focus:outline-none"
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value === "Type: All" ? "All" : e.target.value)}
                  >
                    <option>Type: All</option>
                    <option>Credit</option>
                    <option>Debit</option>
                    <option>Transfer</option>
                  </select>
                  <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                </div>
                {/* Status filter */}
                <div className="relative flex-1">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">sync</span>
                  <select
                    className="input-chip w-full pl-10 pr-4 py-2.5 rounded-lg appearance-none focus:outline-none"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value === "Status: All" ? "All" : e.target.value)}
                  >
                    <option>Status: All</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                  <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                </div>
                <button onClick={downloadCSV} className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2.5 px-6 rounded-lg flex items-center justify-center transition">
                  <span className="material-icons mr-2">download</span>
                  CSV
                </button>
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-md p-6 text-red-600">
                Error loading transactions: {error}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                {transactions.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No transactions found matching the selected filters.
                  </div>
                ) : (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Description</th>
                        <th className="px-6 py-3 font-medium">Type</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Reference</th>
                        <th className="px-6 py-3 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, idx) => {
                        const isCredit = tx.type === 'Credit' || tx.amount.startsWith('+');
                        return (
                          <tr key={tx.id || idx} className={`table-row-alt border-b`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(tx.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                              {tx.description || tx.desc}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{tx.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tx.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                tx.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tx.reference || tx.ref}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-right font-semibold ${
                              isCredit ? 'text-green-600' : 'text-gray-900'
                            }`}>
                              {isCredit ? '+' : '-'}₹
                              {Number(tx.amount.replace(/[^0-9.-]+/g, '')).toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Statements tab */}
        {activeTab === "Statements" && <StatementsPage />}
      </main>
    </div>
  );
}
