import React from "react";
import { useNavigate } from "react-router-dom";
import "../TransferSuccess.css";

export default function TransferSuccess() {
  const navigate = useNavigate();

  return (
    <div className="transfer-success-page bg-gray-50 min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <header className="transfer-header fixed top-0 left-0 w-full bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-xl font-semibold text-gray-800">Digital Bank</h1>
      </header>

      <main className="mt-20 w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="success-icon w-24 h-24 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-white text-6xl">check</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Transfer Submitted</h2>
            <p className="text-gray-500 mt-2">
              Your transfer was successfully created and is processing.
            </p>
          </div>

          <div className="transfer-summary bg-white rounded-lg shadow-sm border border-gray-100 mt-8">
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-500 text-sm">Reference</span>
                <span className="font-medium text-gray-800">TRX-22481</span>
              </div>
              <div className="bg-gray-50 rounded-md flex justify-between items-center py-3 px-4 -mx-4 sm:-mx-6">
                <span className="text-gray-500 text-sm">From</span>
                <span className="font-medium text-gray-800">Checking •••• 1234</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-500 text-sm">To</span>
                <span className="font-medium text-gray-800">Savings •••• 8910</span>
              </div>
              <div className="bg-gray-50 rounded-md flex justify-between items-center py-3 px-4 -mx-4 sm:-mx-6">
                <span className="text-gray-500 text-sm">Amount</span>
                <span className="font-bold text-lg text-orange-500">$500.00</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              className="gradient-button w-full text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={() => navigate("/dashboard")}
            >
              View Account
            </button>
            <button
              className="ghost-button w-full text-gray-600 font-semibold py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
              onClick={() => navigate("/transfer-step1")}
            >
              New Transfer
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              className="text-sm text-gray-500 underline hover:text-gray-800 transition-colors"
            >
              Download receipt (PDF)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
