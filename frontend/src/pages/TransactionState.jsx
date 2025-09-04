import React from "react";
import { useNavigate } from "react-router-dom";
import "../TransactionState.css"; // We'll create this CSS for shimmer and other custom styles

export default function TransactionState() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-xl font-medium text-gray-500">
          States — Transactions
        </h1>
      </header>

      {/* Cards */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* No Transactions Card */}
        <div className="card">
          <span className="material-icons text-7xl text-blue-600 mb-6">
            account_balance_wallet
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No transactions yet.
          </h2>
          <p className="text-gray-500 mb-8">
            Get started by making your first transfer.
          </p>
          <button
            className="w-full max-w-xs text-white font-semibold py-3 px-6 rounded-lg gradient-button hover:gradient-button-hover transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={() => navigate("/transfer-step1")} // Navigate to first transfer step
          >
            Make your first transfer
          </button>
        </div>

        {/* Loading Card */}
        <div className="card">
          <span className="material-icons text-7xl text-gray-400 mb-6 animate-spin">
            sync
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Loading transactions...
          </h2>
          <div className="w-full space-y-4">
            <div className="h-10 w-full rounded-md shimmer"></div>
            <div className="h-10 w-full rounded-md shimmer"></div>
            <div className="h-10 w-4/5 rounded-md shimmer"></div>
          </div>
        </div>

        {/* Error Card */}
        <div className="card">
          <span className="material-icons text-7xl text-[#FF8040] mb-6">
            error_outline
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            We couldn’t load transactions.
          </h2>
          <p className="text-gray-500 mb-8">
            There was a problem fetching your data. Please try again.
          </p>
          <button
            className="w-full max-w-xs text-white font-semibold py-3 px-6 rounded-lg bg-[#E63946] hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={() => navigate("/transaction-state")} // Simulate retry
          >
            Retry
          </button>
        </div>
      </main>
    </div>
  );
}
