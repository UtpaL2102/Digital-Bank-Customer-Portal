import React from "react";
import { useNavigate } from "react-router-dom";
import "../TransferReview.css";

export default function TransferReview() {
  const navigate = useNavigate();

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
                <p className="font-medium text-gray-900">Checking •••• 1234 — $8,420.12</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Amount</p>
                <p className="font-medium text-gray-900">$500.00</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">To</p>
                <p className="font-medium text-gray-900">Savings •••• 9910</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Schedule</p>
                <p className="font-medium text-gray-900">Now</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-500 mb-1">Description</p>
                <p className="font-medium text-gray-900">Monthly transfer</p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="border-r border-gray-200 pr-4">
                <p className="text-gray-500 mb-1">Fee</p>
                <p className="font-medium text-gray-900">$0.00</p>
              </div>
              <div className="md:border-r md:border-gray-200 md:pr-4">
                <p className="text-gray-500 mb-1">Estimated arrival</p>
                <p className="font-medium text-gray-900">Instant</p>
              </div>
              <div className="border-r border-gray-200 pr-4">
                <p className="text-gray-500 mb-1">Daily limit remaining</p>
                <p className="font-medium text-gray-900">$3,750</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Idempotency key</p>
                <p className="font-medium text-gray-900">auto-generated</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4">
              <button
                className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
  className="confirm-btn w-full sm:w-auto px-6 py-3 rounded-lg gradient-bg text-white font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
  onClick={() => navigate("/transfer-success")}
>
  <span className="btn-text">Confirm</span>
  <span className="material-icons check-icon">check</span>
</button>

            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center bg-blue-50 text-blue-800 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2">verified_user</span> Double-charge protection
              </div>
              <div className="flex items-center bg-blue-50 text-blue-800 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2">history</span> Audit trail logging
              </div>
              <div className="flex items-center bg-blue-50 text-blue-800 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2">notifications_active</span> Success notification
              </div>
              <div className="flex items-center bg-orange-100 text-orange-600 rounded-full px-4 py-2">
                <span className="material-icons text-base mr-2 text-orange-500">warning</span> Transfers are final
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
