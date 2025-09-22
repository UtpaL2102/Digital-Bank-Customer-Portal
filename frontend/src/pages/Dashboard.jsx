import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import { CircularProgress } from "@mui/material";
import "../DashboardLight.css";

// Helper function to get greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Helper function to get transaction icon based on category
const getTransactionIcon = (category) => {
  const icons = {
    'SHOPPING': 'shopping_bag',
    'GROCERIES': 'shopping_cart',
    'SALARY': 'work',
    'TRANSFER': 'swap_horiz',
    'UTILITY': 'lightbulb',
    'ATM': 'atm',
    'DINING': 'restaurant',
    'TRANSPORTATION': 'directions_car',
    'ENTERTAINMENT': 'movie',
    'HEALTH': 'local_hospital',
    'EDUCATION': 'school',
    'OTHER': 'payment'
  };
  return icons[category] || 'payment';
};

// Helper function to determine category from description
const getCategoryFromDescription = (description) => {
  if (!description) return 'OTHER';
  description = description.toLowerCase();
  
  if (description.includes('initial balance')) return 'DEPOSIT';
  if (description.includes('transfer')) return 'TRANSFER';
  if (description.includes('gift')) return 'TRANSFER';
  if (description.includes('deposit')) return 'DEPOSIT';
  if (description.includes('withdrawal')) return 'ATM';
  if (description.includes('payment')) return 'UTILITY';
  if (description.includes('salary')) return 'SALARY';
  return 'OTHER';
};

// Helper function to get transaction icon color based on category
const getTransactionIconColor = (category) => {
  const colors = {
    'SHOPPING': 'text-purple-500 dark:text-purple-300',
    'GROCERIES': 'text-green-500 dark:text-green-300',
    'SALARY': 'text-green-500 dark:text-green-400',
    'TRANSFER': 'text-blue-500 dark:text-blue-300',
    'UTILITY': 'text-yellow-500 dark:text-yellow-400',
    'ATM': 'text-red-500 dark:text-red-400',
    'DINING': 'text-orange-500 dark:text-orange-300',
    'TRANSPORTATION': 'text-blue-500 dark:text-blue-300',
    'ENTERTAINMENT': 'text-pink-500 dark:text-pink-300',
    'HEALTH': 'text-red-500 dark:text-red-300',
    'EDUCATION': 'text-indigo-500 dark:text-indigo-300',
    'OTHER': 'text-gray-500 dark:text-gray-300'
  };
  return colors[category] || 'text-gray-500 dark:text-gray-300';
};

const Dashboard = () => {
  const navigate = useNavigate();

  // User data state
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Accounts state
  const [accounts, setAccounts] = useState({
    checking: { balance: 0, account_number: null, id: null },
    savings: { balance: 0, account_number: null, id: null },
    credit: { balance: 0, account_number: null, id: null }
  });
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState(null);
  
  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState(null);
  
  // Limits state
  const [limits, setLimits] = useState(null);
  const [limitsLoading, setLimitsLoading] = useState(true);
  const [limitsError, setLimitsError] = useState(null);

  // Fetch transfer limits
  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.log('No auth token found while fetching limits');
          setLimitsError('Authentication required');
          return;
        }

        // Get the first account id from accounts list
        const { accounts: accountsList } = await api.accounts.getAccountsList(token);
        if (!accountsList || !Array.isArray(accountsList)) {
          throw new Error('Invalid accounts response');
        }

        const firstAccount = accountsList[0];
        if (!firstAccount?.id) {
          console.log('No valid account found for limits');
          // Set default limits for new users
          setLimits({
            daily: { limit: 0, used: 0 },
            monthly: { limit: 0, used: 0 }
          });
          return;
        }

        const currentLimits = await api.limits.getCurrentLimits(firstAccount.id, token);
        if (!currentLimits) {
          throw new Error('No response from limits API');
        }

        // Set limits with proper validation and defaults
        setLimits({
          daily: {
            limit: parseFloat(currentLimits?.daily?.limit) || 0,
            used: parseFloat(currentLimits?.daily?.used) || 0
          },
          monthly: {
            limit: parseFloat(currentLimits?.monthly?.limit) || 0,
            used: parseFloat(currentLimits?.monthly?.used) || 0
          }
        });
        setLimitsError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching limits:', err);
        if (err.message === 'Invalid token' || err.status === 401) {
          console.log('Token invalid while fetching limits');
          navigate('/login');
          return;
        }
        setLimitsError(err.message || 'Failed to fetch limits');
        // Set safe default limits on error
        setLimits({
          daily: { limit: 0, used: 0 },
          monthly: { limit: 0, used: 0 }
        });
      } finally {
        setLimitsLoading(false);
      }
    };

    fetchLimits();
  }, [navigate]);

  // Fetch transactions data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.log('No auth token found while fetching transactions');
          setTransactionsError('Authentication required');
          return;
        }

        // Get the first account id from accounts list
        const { accounts: accountsList } = await api.accounts.getAccountsList(token);
        if (!accountsList || !Array.isArray(accountsList)) {
          throw new Error('Invalid accounts response');
        }

        const firstAccount = accountsList[0];
        if (!firstAccount?.id) {
          console.log('No valid account found for transactions');
          setTransactions([]);
          return;
        }

        // Fetch transactions from API
        console.log('Fetching transactions for account:', firstAccount.id);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const url = `${baseUrl}/api/v1/transactions?accountId=${firstAccount.id}&page=1&pageSize=5`;
        console.log('Attempting to fetch from URL:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Transactions response:', data);

        if (!data || !data.transactions) {
          console.warn('No transactions data received');
          setTransactions([]);
          setTransactionsError('No transactions found');
          return;
        }

          // Format and set transactions data
          const formattedTransactions = data.transactions.map(tx => ({
            id: tx.id,
            amount: parseFloat(tx.amount),
            type: tx.type === 'deposit' ? 'CREDIT' : 'DEBIT',
            description: tx.description || 'Unknown transaction',
            date: tx.created_at,
            account_type: tx.fromAccount?.account_type || 'unknown',
            category: getCategoryFromDescription(tx.description),
            status: tx.status.charAt(0).toUpperCase() + tx.status.slice(1).toLowerCase()
          }));

          setTransactions(formattedTransactions);
          setTransactionsError(null); // Clear any previous errors
        } catch (err) {
          console.error('Error in transaction fetch flow:', err);
          if (err.status === 401) {
            console.log('Token invalid while fetching transactions');
            navigate('/login');
            return;
          }
          setTransactionsError('Failed to load transactions');
          setTransactions([]);
        } finally {
          setTransactionsLoading(false);
        }
    };

    fetchTransactions();
  }, [navigate]);

  // Fetch accounts data
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.log('No auth token found while fetching accounts');
          setAccountsError('Authentication required');
          return;
        }

        const response = await api.accounts.getAccountsList(token);
        if (!response) {
          throw new Error('No response from accounts API');
        }

        const accountsList = response.accounts || [];
        
        // Group accounts by type with proper data structure
        const grouped = {
          checking: accountsList.find(acc => acc.account_type?.toLowerCase()?.includes('checking')) || {
            balance: 0,
            account_number: '0000',
            id: null
          },
          savings: accountsList.find(acc => acc.account_type?.toLowerCase()?.includes('savings')) || {
            balance: 0,
            account_number: '0000',
            id: null
          },
          credit: accountsList.find(acc => acc.account_type?.toLowerCase()?.includes('credit')) || {
            balance: 0,
            account_number: '0000',
            id: null
          }
        };

        // Ensure balance is a number for all accounts and handle potential null/undefined values
        grouped.checking.balance = Number(grouped.checking.balance) || 0;
        grouped.savings.balance = Number(grouped.savings.balance) || 0;
        grouped.credit.balance = Number(grouped.credit.balance) || 0;

        setAccounts(grouped);
        setAccountsError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching accounts:', err);
        if (err.message === 'Invalid token' || err.status === 401) {
          console.log('Token invalid while fetching accounts');
          navigate('/login');
          return;
        }
        setAccountsError(err.message || 'Failed to fetch accounts');
      } finally {
        setAccountsLoading(false);
      }
    };

    fetchAccounts();
  }, [navigate]);

  // Fetch user data and validate authentication
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.log('No auth token found, redirecting to login');
          sessionStorage.clear();
          navigate('/login');
          return;
        }

        const user = await api.auth.me(token);
        
        if (!user) {
          console.error('No user data received');
          sessionStorage.clear();
          navigate('/login');
          return;
        }

        setUserData(user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        if (err.message === 'Invalid token' || err.status === 401) {
          console.log('Token invalid, redirecting to login');
          sessionStorage.clear();
          navigate('/login');
          return;
        }
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">
            DigitalSecure
          </h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <div className="px-3">
            <div className="space-y-1">
              {/* Active link has bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 */}
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <span className="material-icons mr-3 text-[20px]">dashboard</span>
                Dashboard
              </a>

              <button
                onClick={() => navigate("/account-details")}
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <span className="material-icons mr-3 text-[20px]">account_balance_wallet</span>
                Accounts
              </button>

              <button
                onClick={() => navigate("/transfer-step1")}
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="material-icons mr-3 text-[20px]">swap_horiz</span>
                Transfers
              </button>

              <button
                onClick={() => navigate("/statements", { state: { fromDashboard: true } })}
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="material-icons mr-3 text-[20px]">description</span>
                Statements
              </button>

              <button
                onClick={() => navigate("/loans")}
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="material-icons mr-3 text-[20px]">account_balance</span>
                Loans
              </button>

              <button
                onClick={() => navigate("/limit")}
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="material-icons mr-3 text-[20px]">trending_up</span>
                Request Limit
              </button>

              <button
                onClick={() => navigate("/notifications-list")}
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="material-icons mr-3 text-[20px]">notifications</span>
                Notifications
              </button>

              <button
                onClick={() => navigate("/chatbot")}
                className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="material-icons mr-3 text-[20px]">chat</span>
                Chatbot Support
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigate("/profile-security")}
            className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <span className="material-icons mr-3 text-[20px]">security</span>
            Profile & Security
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow-sm mb-8 rounded-lg">
          <div className="flex justify-between items-center py-4">
            <div>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-8 w-64 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 w-96 bg-gray-100 rounded animate-pulse"></div>
                </div>
              ) : error ? (
                <div className="text-red-600 text-sm p-4 bg-red-50 rounded-lg border border-red-100">
                  {error}
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getGreeting()}, {userData?.name || 'User'}
                  </h2>
                  <p className="text-sm text-gray-700">
                    Here's a quick summary of your accounts and recent activity
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 h-10 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  search
                </span>
              </div>

              {/* Profile Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  {loading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {userData?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="material-icons text-gray-400 text-[18px]">expand_more</span>
                      </div>
                    </>
                  )}
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-100 invisible group-hover:visible hover:visible transition-all duration-300 z-50">
                  <button
                    onClick={() => navigate('/profile-security')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile & Security
                  </button>
                  <button
                    onClick={() => {
                      sessionStorage.clear();
                      navigate('/login');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Accounts Section */}
                {/* Accounts Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Checking Account */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Checking **** {accounts?.checking?.account_number?.slice(-4) || '1234'}</h3>
              </div>
              <span className="material-icons text-blue-600">account_balance</span>
            </div>
            
            {accountsLoading ? (
              <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
            ) : accounts?.checking?.id ? (
              <div className="mb-6">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{accounts.checking.balance.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-6">No checking account</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate(accounts.checking.id ? '/transfer-step1' : '/account-details?type=checking')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {accounts.checking.id ? 'Transfer' : 'Open Account'}
              </button>
              <button
                onClick={() => navigate('/statements')}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Statement
              </button>
            </div>
          </div>

          {/* Savings Account */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Savings **** {accounts?.savings?.account_number?.slice(-4) || '9590'}</h3>
              </div>
              <span className="material-icons text-green-600">savings</span>
            </div>
            
            {accountsLoading ? (
              <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
            ) : accounts?.savings?.id ? (
              <div className="mb-6">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{accounts.savings.balance.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-6">No savings account</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate(accounts.savings.id ? '/transfer-step1' : '/account-details?type=savings')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {accounts.savings.id ? 'Transfer' : 'Open Account'}
              </button>
              <button
                onClick={() => navigate('/statements')}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Statement
              </button>
            </div>
          </div>

          {/* Credit Card */}
                      {/* Credit Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Credit **** {accounts?.credit?.account_number?.slice(-4) || '4488'}</h3>
              </div>
              <span className="material-icons text-red-600">credit_card</span>
            </div>
            
            {accountsLoading ? (
              <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
            ) : accounts?.credit?.id ? (
              <div className="mb-6">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{accounts.credit.balance.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mb-6">No credit card</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate(accounts.credit.id ? '/pay-bill' : '/account-details?type=credit')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {accounts.credit.id ? 'Pay Bill' : 'Apply Now'}
              </button>
              <button
                onClick={() => navigate('/statements')}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Statement
              </button>
            </div>
          </div>
        </div>

        {/* Limits & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Limits */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Transfer Limits
            </h3>
            {limitsLoading ? (
              <div className="space-y-4">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
                <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ) : limitsError ? (
              <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">
                {limitsError}
              </div>
            ) : !limits ? (
              <div className="text-gray-500 text-sm">
                No limit information available
              </div>
            ) : (
              <div className="space-y-6">
                {/* Daily Limit */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Daily</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Used ₹{(limits?.daily?.used || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-200 dark:bg-blue-800">
                          ₹{(limits?.daily?.limit || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100 dark:bg-blue-900/30">
                      <div
                        style={{ width: `${((limits?.daily?.used || 0) / (limits?.daily?.limit || 1)) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400"
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Monthly Limit */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Monthly</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Used ₹{(limits?.monthly?.used || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 dark:text-orange-200 dark:bg-orange-800">
                          ₹{(limits?.monthly?.limit || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-100 dark:bg-orange-900/30">
                      <div
                        style={{ width: `${((limits?.monthly?.used || 0) / (limits?.monthly?.limit || 1)) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 dark:bg-orange-400"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Recent Transactions
              </h3>
              <button 
                onClick={() => navigate('/statements')}
                className="text-blue-700 text-sm font-medium hover:text-blue-800"
              >
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              {transactionsLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center justify-between py-3">
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mx-2"></div>
                    </div>
                  ))}
                </div>
              ) : transactionsError ? (
                <div className="text-red-500 text-sm p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  {transactionsError}
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                  <span className="material-icons text-4xl mb-2">receipt_long</span>
                  <p>No recent transactions found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {transactions.map((transaction, index) => {
                    const isCredit = transaction.type === 'CREDIT';
                    const icon = getTransactionIcon(transaction.category);
                    const iconColor = getTransactionIconColor(transaction.category).replace('dark:text-purple-300', '')
                      .replace('dark:text-green-300', '')
                      .replace('dark:text-blue-300', '')
                      .replace('dark:text-green-400', '')
                      .replace('dark:text-yellow-400', '')
                      .replace('dark:text-red-400', '')
                      .replace('dark:text-orange-300', '')
                      .replace('dark:text-pink-300', '')
                      .replace('dark:text-red-300', '')
                      .replace('dark:text-indigo-300', '')
                      .replace('dark:text-gray-300', '');

                    return (
                      <div key={transaction.id} className="flex items-center justify-between py-4 group hover:bg-gray-50/80 -mx-6 px-6 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-20 ${
                            iconColor.replace('text-', 'bg-').replace('500', '100')
                          }`}>
                            <span className={`material-icons ${iconColor}`}>
                              {icon}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-600">
                              {new Date(transaction.date).toLocaleDateString()} • {transaction.account_type}
                            </p>
                          </div>
                        </div>
                        <div className={`text-sm font-semibold ${
                          isCredit
                            ? 'text-green-600'
                            : 'text-gray-900'
                        }`}>
                          {isCredit ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Button */}
        <button
          onClick={() => navigate("/Faq")}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          <span className="material-icons text-3xl">help_outline</span>
        </button>

      </main>
    </div>
  );
};

export default Dashboard;
