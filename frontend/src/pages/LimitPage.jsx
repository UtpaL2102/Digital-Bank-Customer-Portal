// src/pages/LimitPage.jsx
import React, { useState } from "react";

export default function LimitPage() {
  // Simulating values fetched from an API or backend
  const [limits, setLimits] = useState({
    dailyLimit: 7500,
    dailyUsed: 2000,  // amount already used today
    monthlyLimit: 30000,
    monthlyUsed: 12000, // amount already used this month
  });

  const currentDailyRemaining = limits.dailyLimit - limits.dailyUsed;
  const currentMonthlyRemaining = limits.monthlyLimit - limits.monthlyUsed;

  return (
    <div className="bg-[#F5F7FA] flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-lg">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Account Limits</h1>

        {/* Current Limit Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Limits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Current Daily Remaining</span>
              <span className="text-xl font-bold text-gray-900">
                ₹{currentDailyRemaining.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                Used: ₹{limits.dailyUsed.toLocaleString()} / ₹{limits.dailyLimit.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Current Monthly Remaining</span>
              <span className="text-xl font-bold text-gray-900">
                ₹{currentMonthlyRemaining.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                Used: ₹{limits.monthlyUsed.toLocaleString()} / ₹{limits.monthlyLimit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Request Limit Increase Form */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Limit Increase</h2>
        <form action="#" method="POST">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* New daily limit */}
            <div>
              <label htmlFor="daily-limit" className="block text-sm font-medium text-gray-700 mb-2">
                New daily limit
              </label>
              <div className="relative rounded-md shadow-sm border border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="material-icons text-gray-400">monetization_on</span>
                </div>
                <input
                  type="text"
                  name="daily-limit"
                  id="daily-limit"
                  placeholder="Enter new daily limit"
                  className="block w-full rounded-md border-0 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
                />
              </div>
            </div>

            {/* New monthly limit */}
            <div>
              <label htmlFor="monthly-limit" className="block text-sm font-medium text-gray-700 mb-2">
                New monthly limit<span className="text-[#FF8040]">*</span>
              </label>
              <div className="relative rounded-md shadow-sm border border-gray-300 input-error focus-within:border-[#FF8040] focus-within:ring-2 focus-within:ring-[#FF8040] transition-all duration-200">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="material-icons text-gray-400">calendar_today</span>
                </div>
                <input
                  type="text"
                  name="monthly-limit"
                  id="monthly-limit"
                  placeholder="Enter new monthly limit"
                  className="block w-full rounded-md border-0 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-[#FF8040]">This limit exceeds the maximum allowed.</p>
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason
              </label>
              <textarea
                name="reason"
                id="reason"
                rows="4"
                placeholder="Please provide a reason for this limit increase..."
                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-0 focus:border-[#0046FF] focus:shadow-[0_0_0_2px_rgba(0,70,255,0.2)] transition-all duration-200"
              />
              <p className="mt-2 text-sm text-gray-500">
                A clear reason helps us process your request faster.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row-reverse gap-4">
            <button
              type="submit"
              className="w-full md:w-auto inline-flex justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0046FF] focus:ring-offset-2"
              style={{ backgroundImage: "linear-gradient(to right, #001BB7, #0046FF)" }}
            >
              Send
            </button>
            <button
              type="button"
              className="w-full md:w-auto inline-flex justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 py-3 px-8 text-base font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
