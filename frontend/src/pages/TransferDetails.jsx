import React from "react";
import { useNavigate } from "react-router-dom";

export default function TransferDetails() {
  const navigate = useNavigate();

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
                      value="Checking **** 1234 — $8,420.12"
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
                      value="Savings **** 9910"
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
                      className="input-field font-semibold"
                      type="text"
                      value="$ 500.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <div className="input-chip">
                    <input
                      className="input-field"
                      placeholder="Monthly transfer"
                      type="text"
                    />
                  </div>
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
                    <input className="input-field" type="text" value="Now" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery date
                  </label>
                  <div className="input-chip flex items-center">
                    <span className="material-icons text-gray-500 mr-3">
                      calendar_today
                    </span>
                    <input
                      className="input-field"
                      type="date"
                      value="2025-08-10"
                    />
                  </div>
                </div>
              </div>

              {/* Limit Bar */}
              <div className="bg-gray-100/70 p-4 rounded-lg">
                <div className="limit-bar mb-2">
                  <div className="limit-progress" style={{ width: "25%" }}></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-600">
                    <span className="font-medium">Daily limit:</span>
                    <span className="font-semibold text-gray-800">$5,000</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Used:</span>
                    <span className="font-semibold text-gray-800">$1,250</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Remaining:</span>
                    <span className="font-semibold text-green-600">$3,750</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center pt-4">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
  className="btn-primary"
  onClick={() => navigate("/transfer-review")}
>
  Review
</button>

              </div>
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
                      Checking **** 1234
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-semibold text-gray-800">
                      Savings **** 9910
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-lg font-bold text-gray-900">
                      $500.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-semibold text-gray-800">$0.00</span>
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
                    Use idempotency keys on confirm
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
