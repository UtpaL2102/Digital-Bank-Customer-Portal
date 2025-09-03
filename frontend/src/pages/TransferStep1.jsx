import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../transferStep1.css";

// Import Material Icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PushPinIcon from "@mui/icons-material/PushPin";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TransferStep1 = () => {
  const navigate = useNavigate();
  const [showNewAccount, setShowNewAccount] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    fromAccount: "Checking **** 1234 — $8,420.12",
    beneficiary: "John Doe",
    accountName: "",
    accountNumber: "",
    ifscSwift: "",
  });

  // Update form state on input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Navigate to Transfer Details page
  const handleNext = (e) => {
    e.preventDefault();
    navigate("/transfer-details"); // No props for now
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900">DigitalSecure</h1>
        </div>
      </header>

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
                      <input
                        id="fromAccount"
                        type="text"
                        value={formData.fromAccount}
                        readOnly
                        className="w-full pl-10 border-none focus:ring-0 bg-transparent"
                      />
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
                            <option>John Doe</option>
                            <option>Jane Smith</option>
                            <option>Peter Jones</option>
                          </select>
                          <ExpandMoreIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* New External Account */}
                    {showNewAccount && (
                      <div id="new-account-section" className="space-y-6">
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
                              className="w-full pl-10 border-none focus:ring-0 bg-transparent"
                            />
                          </div>
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
                              className="w-full pl-10 border-none focus:ring-0 bg-transparent"
                            />
                          </div>
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
                              className="w-full pl-10 border-none focus:ring-0 bg-transparent"
                            />
                          </div>
                        </div>
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
            {!showNewAccount && (
              <div
                id="beneficiary-details-card"
                className="bg-white rounded-xl p-8 form-card h-min"
              >
                <h3 className="text-lg font-semibold mb-6">
                  Selected Beneficiary
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold text-gray-800">
                      {formData.beneficiary}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account</p>
                    <p className="font-semibold text-gray-800">**** 9910</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bank</p>
                    <p className="font-semibold text-gray-800">DB Main</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last used</p>
                    <p className="font-semibold text-gray-800">2023-08-01</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransferStep1;
