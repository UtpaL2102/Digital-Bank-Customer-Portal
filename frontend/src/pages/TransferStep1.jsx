import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash-es/debounce";
import "../TransferStep1.css";
import { accounts as accountsApi, beneficiaries as beneficiariesApi } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import { formatCurrency } from "../lib/currencyHelpers";
import { CircularProgress, Alert } from "@mui/material";

// When using Vite's proxy, we don't need the full URL
const BASE_URL = '';

// Import Material Icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PushPinIcon from "@mui/icons-material/PushPin";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TransferStep1 = () => {
  const navigate = useNavigate();
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountsList, setAccountsList] = useState([]);
  const [beneficiaryList, setBeneficiaryList] = useState([]);

  // Form data state
  const [formData, setFormData] = useState({
    fromAccount: "",
    beneficiary: "",
    accountName: "",
    accountNumber: "",
    ifscSwift: "",
    bankName: "Digital Secure Bank", // Default bank name
    transferType: "self", // "self" | "bank" | "external"
    toAccount: "", // For self transfers
  });

  // Account search state for bank users
  const [searchAccount, setSearchAccount] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Fetch accounts and beneficiaries on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const [accountsData, beneficiariesData] = await Promise.all([
          accountsApi.getAccountsList(token),
          beneficiariesApi.listBeneficiaries(token)
        ]);

        // Normalize list responses
        const normalizeList = (resp) => {
          if (Array.isArray(resp)) return resp;
          if (resp?.accounts) return resp.accounts;
          if (resp?.items) return resp.items;
          return [];
        };
        
        console.log('Raw accounts data:', accountsData);
        const normalizedAccounts = normalizeList(accountsData);
        console.log('Normalized accounts:', normalizedAccounts);
        
        setAccountsList(normalizedAccounts);
        setBeneficiaryList(normalizeList(beneficiariesData));

        // Set default selections from normalized arrays
        const accountsArr = normalizeList(accountsData);
        const beneficiariesArr = normalizeList(beneficiariesData);
        
        if (accountsArr.length > 0) {
          setFormData(prev => ({
            ...prev,
            fromAccount: accountsArr[0].id
          }));
        }
        if (beneficiariesArr.length > 0) {
          setFormData(prev => ({
            ...prev,
            beneficiary: beneficiariesArr[0].id
          }));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load account data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Form validation state
  const [formErrors, setFormErrors] = useState({});

  // Search for bank accounts
  const searchBankAccounts = async (searchTerm) => {
    const cleanTerm = searchTerm?.trim();
    console.log('searchBankAccounts called with term:', cleanTerm, 'length:', cleanTerm?.length);

    // Clear results if search is empty
    if (!cleanTerm) {
      setSearchResults([]);
      setError(null);
      return;
    }

    // Early validation to prevent unnecessary API calls
    if (cleanTerm.length < 4) {
      console.log('Term too short:', cleanTerm);
      setSearchResults([]);
      setError('Please enter at least 4 characters');
      return;
    }

    try {
      setSearching(true);
      setError(null);
      const token = getAuthToken();
      
      // Validate token
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }

      console.log('Calling API with term:', cleanTerm);
      const data = await accountsApi.searchAccounts(cleanTerm, token);
      
      // Add detailed logging
      console.log('Search API response:', data);
      
      // Normalize and validate response
      let accounts = [];
      if (Array.isArray(data)) {
        accounts = data;
      } else if (data?.accounts) {
        accounts = data.accounts;
      } else if (data?.items) {
        accounts = data.items;
      }

      // Validate account data
      if (accounts.length === 0) {
        setError('No matching accounts found');
      } else {
        console.log('Found accounts:', accounts);
      }

      setSearchResults(accounts);
    } catch (err) {
      console.error('Account search failed:', err);
      setError(err.message || 'Failed to search for accounts');
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  // Debounce search to prevent too many API calls
  const debouncedSearch = useCallback(
    debounce((term) => {
      console.log('Debounced search called with:', term); // Debug log
      searchBankAccounts(term);
    }, 300),
    [searchBankAccounts] // Include searchBankAccounts in dependencies
  );

  // Update form state on input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    if (id === 'searchAccount') {
      const cleanValue = value?.trim();
      console.log('Search input changed to:', cleanValue, 'length:', cleanValue?.length);
      
      // Always update the visible input
      setSearchAccount(value);
      
      // Only trigger search if we have content
      if (cleanValue) {
        if (cleanValue.length >= 4) {
          console.log('Will trigger search for:', cleanValue);
          debouncedSearch(cleanValue);
          setError(null); // Clear any "too short" errors
        } else {
          console.log('Term too short, showing message');
          setError('Please enter at least 4 characters');
          setSearchResults([]);
        }
      } else {
        // Clear everything if input is empty
        setSearchResults([]);
        setError(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
    
    // Clear form errors for the changed field
    setFormErrors(prev => ({ ...prev, [id]: "" }));
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    // Validate source account for all cases
    if (!formData.fromAccount) {
      errors.fromAccount = "Please select a source account";
    } else if (!accountsList.find(a => a.id === formData.fromAccount)) {
      errors.fromAccount = "Selected account not found";
    }

    if (showNewAccount) {
      if (formData.transferType === "self") {
        // Internal transfer validation
        if (!formData.toAccount) {
          errors.toAccount = "Please select a destination account";
        } else if (!accountsList.find(a => a.id === formData.toAccount)) {
          errors.toAccount = "Selected account not found";
        } else if (formData.toAccount === formData.fromAccount) {
          errors.toAccount = "Cannot transfer to the same account";
        }
      } else if (formData.transferType === "bank") {
        // Bank user transfer validation
        if (!formData.accountNumber?.trim()) {
          errors.accountNumber = "Account number is required";
        }
      } else {
        // External transfer validation
        if (!formData.accountName?.trim()) {
          errors.accountName = "Account name is required";
        }
        if (!formData.accountNumber?.trim()) {
          errors.accountNumber = "Account number is required";
        } else if (!/^\d{9,18}$/.test(formData.accountNumber.trim())) {
          errors.accountNumber = "Invalid account number format";
        }
        if (!formData.ifscSwift?.trim()) {
          errors.ifscSwift = "IFSC/SWIFT code is required";
        } else if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(formData.ifscSwift.trim())) {
          errors.ifscSwift = "Invalid IFSC/SWIFT format";
        }
        if (!formData.bankName?.trim()) {
          errors.bankName = "Bank name is required";
        }
      }
    } else {
      // Existing beneficiary validation
      if (!formData.beneficiary) {
        errors.beneficiary = "Please select a beneficiary";
      } else if (!beneficiaryList.find(b => b.id === formData.beneficiary)) {
        errors.beneficiary = "Selected beneficiary not found";
      }
    }

    return errors;
  };

  // Navigate to Transfer Details page
  const handleNext = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (showNewAccount) {
        if (formData.transferType === "self") {
          // Get the selected account details
          const selectedAccount = accountsList.find(acc => acc.id === formData.toAccount);
          if (!selectedAccount) {
            throw new Error("Selected account not found");
          }

          // Create an internal beneficiary automatically
          const token = getAuthToken();
          const beneficiaryData = {
            name: `${selectedAccount.account_type.charAt(0).toUpperCase() + selectedAccount.account_type.slice(1)} Account ${selectedAccount.account_number.slice(-4)}`,
            account_number: selectedAccount.account_number,
            bank_name: "Digital Secure Bank",
            ifsc_swift: selectedAccount.branch?.code || "DSBLR560037",
            currency: "INR"
          };
          
          const internalBeneficiary = await beneficiariesApi.addBeneficiary(beneficiaryData, token);
          
          // Navigate with internal beneficiary
          navigate("/transfer-details", {
            state: {
              fromAccountId: formData.fromAccount,
              toBeneficiaryId: internalBeneficiary.id,
              transferType: "internal",
              isSameBank: true
            }
          });
        } else if (formData.transferType === "bank") {
          try {
            // Validate required bank user fields
            if (!formData.accountNumber || !formData.accountName) {
              setError("Please search and select a bank account first");
              return;
            }

            // Validate fromAccount
            if (!formData.fromAccount) {
              setError("Please select a source account");
              return;
            }

            const token = getAuthToken();
            if (!token) {
              setError("Authentication required. Please log in again.");
              return;
            }

            // First check if beneficiary already exists
            const existingBeneficiaries = await beneficiariesApi.listBeneficiaries(token);
            const normalizedBeneficiaries = Array.isArray(existingBeneficiaries) 
              ? existingBeneficiaries 
              : existingBeneficiaries?.items || [];

            const existingBeneficiary = normalizedBeneficiaries.find(
              b => b.account_number === formData.accountNumber
            );

            let beneficiaryId;

            if (existingBeneficiary) {
              console.log('Using existing beneficiary:', existingBeneficiary);
              beneficiaryId = existingBeneficiary.id;
            } else {
              // Create new beneficiary with complete data
              const beneficiaryData = {
                name: formData.accountName,
                account_number: formData.accountNumber,
                ifsc_swift: formData.ifscSwift || 'DSBLR560037',
                bank_name: formData.bankName || "Digital Secure Bank",
                currency: "INR"
              };
              
              console.log('Creating new beneficiary:', beneficiaryData);
              
              const response = await beneficiariesApi.addBeneficiary(beneficiaryData, token);
              console.log('Beneficiary creation response:', response);
              
              // Handle different response formats
              const newBeneficiary = response.beneficiary || response;
              
              if (!newBeneficiary?.id) {
                console.error('Invalid beneficiary response:', response);
                throw new Error('Failed to create beneficiary - Invalid response from server');
              }

              console.log('Successfully created beneficiary with ID:', newBeneficiary.id);
              beneficiaryId = newBeneficiary.id;
            }

            if (!beneficiaryId) {
              throw new Error('Could not obtain valid beneficiary ID');
            }

            // Create complete transfer data with all necessary fields
            const transferData = {
              fromAccount: accountsList.find(acc => acc.id === formData.fromAccount),
              fromAccountId: formData.fromAccount,
              toBeneficiary: {
                id: beneficiaryId,
                name: formData.accountName,
                account_number: formData.accountNumber,
                bank_name: formData.bankName || "Digital Secure Bank",
                ifsc_swift: formData.ifscSwift || 'DSBLR560037'
              },
              toBeneficiaryId: beneficiaryId,
              transferType: "internal",
              isSameBank: true,
              description: "", // Will be filled in next step
              amount: 0, // Will be filled in next step
              timestamp: new Date().toISOString()
            };

            console.log('Created transfer data:', transferData);

            // Save to session storage
            sessionStorage.setItem('transferData', JSON.stringify(transferData));

            // Navigate with complete data
            navigate("/transfer-details", { state: transferData });
          } catch (err) {
            console.error('Error in transfer setup:', err);
            setError(err.message || 'Failed to setup transfer. Please try again.');
          }
        } else {
          // Create external bank beneficiary
          const token = getAuthToken();
          const beneficiaryData = {
            name: formData.accountName,
            account_number: formData.accountNumber,
            ifsc_swift: formData.ifscSwift,
            bank_name: formData.bankName,
            currency: "INR" // Default to INR for now
          };
          
          const newBeneficiary = await beneficiariesApi.addBeneficiary(beneficiaryData, token);
          
          // Navigate with external beneficiary
          navigate("/transfer-details", {
            state: {
              fromAccountId: formData.fromAccount,
              toBeneficiaryId: newBeneficiary.id,
              transferType: "external"
            }
          });
        }
      } else {
        // Navigate with existing beneficiary
        navigate("/transfer-details", {
          state: {
            fromAccountId: formData.fromAccount,
            toBeneficiaryId: formData.beneficiary,
            transferType: "external"
          }
        });
      }
    } catch (err) {
      console.error("Error creating beneficiary:", err);
      setError(err.message || "Failed to create beneficiary");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-4">New Transfer</h2>

          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="progress-step progress-step-active">1. From/To</div>
              <div className="progress-line"></div>
              <div className="progress-step progress-step-inactive">2. Details</div>
              <div className="progress-line"></div>
              <div className="progress-step progress-step-inactive">3. Review</div>
            </div>
          </div>

          {/* Form and Beneficiary Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 flex justify-center items-center">
                <CircularProgress />
              </div>
            ) : error ? (
              <div className="col-span-3">
                <Alert severity="error">{error}</Alert>
              </div>
            ) : (
              <>
                {/* Form Section */}
                <div className="lg:col-span-2 bg-white rounded-xl p-8 form-card">
                  <form onSubmit={handleNext}>
                    <div className="space-y-8">
                      {/* From Account */}
                      <div>
                        <label
                          htmlFor="fromAccount"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          From account
                        </label>
                        <div className="relative input-chip">
                          <AccountBalanceWalletIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                          <select
                            id="fromAccount"
                            value={formData.fromAccount}
                            onChange={handleChange}
                            className="w-full pl-10 border-none focus:ring-0 bg-transparent appearance-none"
                          >
                            {accountsList.map(account => (
                              <option key={account.id} value={account.id}>
                                {account.account_type} **** {account.account_number.slice(-4)} — {formatCurrency(account.balance)}
                              </option>
                            ))}
                          </select>
                          <ExpandMoreIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        </div>
                      </div>

                      {/* To Section */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          To
                        </label>
                        {/* Toggle */}
                        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full w-max mb-6">
                          <div
                            className={`pill-toggle ${
                              !showNewAccount
                                ? "pill-toggle-active"
                                : "pill-toggle-inactive"
                            }`}
                            onClick={() => setShowNewAccount(false)}
                          >
                            Existing beneficiary
                          </div>
                          <div
                            className={`pill-toggle ${
                              showNewAccount
                                ? "pill-toggle-active"
                                : "pill-toggle-inactive"
                            }`}
                            onClick={() => setShowNewAccount(true)}
                          >
                            Add Beneficiary
                          </div>
                        </div>

                        {/* Transfer Type Toggle */}
                        {showNewAccount && (
                          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full w-max mb-6">
                            <div
                              className={`pill-toggle ${
                                formData.transferType === "self"
                                  ? "pill-toggle-active"
                                  : "pill-toggle-inactive"
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, transferType: "self" }))}
                            >
                              My Accounts
                            </div>
                            <div
                              className={`pill-toggle ${
                                formData.transferType === "bank"
                                  ? "pill-toggle-active"
                                  : "pill-toggle-inactive"
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, transferType: "bank" }))}
                            >
                              Digital Secure User
                            </div>
                            <div
                              className={`pill-toggle ${
                                formData.transferType === "external"
                                  ? "pill-toggle-active"
                                  : "pill-toggle-inactive"
                              }`}
                              onClick={() => setFormData(prev => ({ ...prev, transferType: "external" }))}
                            >
                              Other Bank
                            </div>
                          </div>
                        )}

                        {/* Existing Beneficiary */}
                        {!showNewAccount && (
                          <div id="existing-beneficiary-section">
                            <label
                              htmlFor="beneficiary"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              Choose beneficiary
                            </label>
                            <div className="relative input-chip">
                              <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                              <select
                                id="beneficiary"
                                value={formData.beneficiary}
                                onChange={handleChange}
                                className="w-full pl-10 border-none focus:ring-0 bg-transparent appearance-none"
                              >
                                {beneficiaryList.map(ben => (
                                  <option key={ben.id} value={ben.id}>
                                    {ben.name} - {ben.bank_name}
                                  </option>
                                ))}
                              </select>
                              <ExpandMoreIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                            </div>
                          </div>
                        )}

                        {/* New Account Section */}
                        {showNewAccount && (
                          <div id="new-account-section" className="space-y-6">
                            {formData.transferType === "self" ? (
                              /* Self Transfer - Between own accounts */
                              <div className="space-y-6">
                                <div>
                                  <label
                                    htmlFor="toAccount"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    To Account
                                  </label>
                                  <div className="relative input-chip">
                                    <AccountBalanceWalletIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <select
                                      id="toAccount"
                                      value={formData.toAccount}
                                      onChange={handleChange}
                                      className="w-full pl-10 border-none focus:ring-0 bg-transparent appearance-none"
                                    >
                                      <option value="">Select an account</option>
                                      {accountsList
                                        .filter(acc => acc.id !== formData.fromAccount)
                                        .map(account => (
                                          <option key={account.id} value={account.id}>
                                            {account.account_type} **** {account.account_number.slice(-4)} — {formatCurrency(account.balance)}
                                          </option>
                                        ))}
                                    </select>
                                    <ExpandMoreIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                                  </div>
                                  {formErrors.toAccount && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.toAccount}</p>
                                  )}
                                </div>
                              </div>
                            ) : formData.transferType === "bank" ? (
                              /* Bank User Transfer - Search Digital Secure accounts */
                              <div className="space-y-6">
                                <div>
                                  <label
                                    htmlFor="searchAccount"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    Search Account Number
                                  </label>
                                  <div className="relative input-chip">
                                    <AccountBalanceIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <input
                                      id="searchAccount"
                                      type="text"
                                      placeholder="Enter account number"
                                      value={searchAccount}
                                      onChange={handleChange}
                                      className="w-full pl-10 border-none focus:ring-0 bg-transparent"
                                    />
                                    {searching && (
                                      <CircularProgress size={20} className="absolute right-4 top-1/2 -translate-y-1/2" />
                                    )}
                                  </div>

                                  {/* Search Results */}
                                  {searchResults.length > 0 && (
                                    <div className="mt-2 bg-white border rounded-lg shadow-sm">
                                      {searchResults.map(account => (
                                        <div
                                          key={account.id}
                                          className="p-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0"
                                          onClick={() => {
                                            setFormData(prev => ({
                                              ...prev,
                                              accountNumber: account.account_number,
                                              accountName: `${account.account_type.toUpperCase()} Account holder`,
                                              ifscSwift: account.branch?.code || 'DSBLR560037',
                                              bankName: 'Digital Secure Bank', // Ensure bank name is set
                                              transferType: 'bank' // Ensure transfer type is set
                                            }));
                                            setSearchResults([]);
                                            setSearchAccount(account.account_number);
                                            setError(null); // Clear any existing errors
                                          }}
                                        >
                                          <p className="font-medium">Account **** {account.account_number.slice(-4)}</p>
                                          <p className="text-sm text-gray-500">Branch: {account.branch?.name || 'Bengaluru'}</p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {formData.accountNumber && (
                                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div>
                                      <p className="text-sm text-gray-500">Bank</p>
                                      <p className="font-medium">Digital Secure Bank</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Branch</p>
                                      <p className="font-medium">Bengaluru</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">IFSC Code</p>
                                      <p className="font-medium">DSBLR560037</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              /* External Transfer - Bank Account Details */
                              <>
                                <div>
                                  <label
                                    htmlFor="accountName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    Account Name
                                  </label>
                                  <div className="relative input-chip">
                                    <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <input
                                      id="accountName"
                                      type="text"
                                      placeholder="e.g., John Doe"
                                      value={formData.accountName}
                                      onChange={handleChange}
                                      className={`w-full pl-10 border-none focus:ring-0 bg-transparent ${
                                        formErrors.accountName ? "error" : ""
                                      }`}
                                    />
                                  </div>
                                  {formErrors.accountName && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.accountName}</p>
                                  )}
                                </div>

                                <div>
                                  <label
                                    htmlFor="bankName"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    Bank Name
                                  </label>
                                  <div className="relative input-chip">
                                    <AccountBalanceIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <input
                                      id="bankName"
                                      type="text"
                                      placeholder="Enter bank name"
                                      value={formData.bankName}
                                      onChange={handleChange}
                                      className={`w-full pl-10 border-none focus:ring-0 bg-transparent ${
                                        formErrors.bankName ? "error" : ""
                                      }`}
                                    />
                                  </div>
                                  {formErrors.bankName && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.bankName}</p>
                                  )}
                                </div>

                                <div>
                                  <label
                                    htmlFor="accountNumber"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    Account Number
                                  </label>
                                  <div className="relative input-chip">
                                    <AccountBalanceIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <input
                                      id="accountNumber"
                                      type="text"
                                      placeholder="Enter account number"
                                      value={formData.accountNumber}
                                      onChange={handleChange}
                                      className={`w-full pl-10 border-none focus:ring-0 bg-transparent ${
                                        formErrors.accountNumber ? "error" : ""
                                      }`}
                                    />
                                  </div>
                                  {formErrors.accountNumber && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.accountNumber}</p>
                                  )}
                                </div>

                                <div>
                                  <label
                                    htmlFor="ifscSwift"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    IFSC / SWIFT
                                  </label>
                                  <div className="relative input-chip">
                                    <PushPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                    <input
                                      id="ifscSwift"
                                      type="text"
                                      placeholder="Enter IFSC or SWIFT code"
                                      value={formData.ifscSwift}
                                      onChange={handleChange}
                                      className={`w-full pl-10 border-none focus:ring-0 bg-transparent ${
                                        formErrors.ifscSwift ? "error" : ""
                                      }`}
                                    />
                                  </div>
                                  {formErrors.ifscSwift && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.ifscSwift}</p>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-12 flex justify-between items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/dashboard")}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Next
                      </button>
                    </div>
                  </form>
                </div>

                {/* Beneficiary Card */}
                {!showNewAccount && formData.beneficiary && (
                  <div
                    id="beneficiary-details-card"
                    className="bg-white rounded-xl p-8 form-card h-min"
                  >
                    <h3 className="text-lg font-semibold mb-6">
                      Selected Beneficiary
                    </h3>
                    {(() => {
                      const selected = beneficiaryList.find(b => b.id === formData.beneficiary);
                      if (!selected) return null;
                      
                      return (
                        <div className="space-y-5">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-semibold text-gray-800">
                              {selected.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Account</p>
                            <p className="font-semibold text-gray-800">
                              **** {selected.account_number.slice(-4)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bank</p>
                            <p className="font-semibold text-gray-800">{selected.bank_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">IFSC/SWIFT</p>
                            <p className="font-semibold text-gray-800">{selected.ifsc_swift}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransferStep1;
