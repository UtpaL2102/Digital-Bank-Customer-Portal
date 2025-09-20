import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`dashboard-container flex min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors duration-300 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}
      <aside className="dashboard-sidebar w-64 flex-shrink-0 p-6 hidden lg:flex flex-col bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 mb-12">
          DigitalSecure
        </h1>
        <nav className="flex flex-col space-y-2">
          <a className="nav-link active" href="#">
            <span className="material-icons mr-3">dashboard</span> Dashboard
          </a>

          {/* Accounts -> /account-details */}
          <button
            type="button"
            onClick={() => navigate("/account-details")}
            className="nav-link text-left"
          >
            <span className="material-icons mr-3">account_balance_wallet</span>
            Accounts
          </button>

          {/* Transfers -> /transfer-step1 */}
          <button
            type="button"
            onClick={() => navigate("/transfer-step1")}
            className="nav-link text-left"
          >
            <span className="material-icons mr-3">swap_horiz</span>
            Transfers
          </button>

          {/* Statements -> Pass fromDashboard = true */}
          <button
            type="button"
            onClick={() => navigate("/statements", { state: { fromDashboard: true } })}
            className="nav-link text-left"
          >
            <span className="material-icons mr-3">description</span>
            Statements
          </button>

          {/* Loans -> /loans */}
  <button
    type="button"
    onClick={() => navigate("/loans")}
    className="nav-link text-left"
  >
    <span className="material-icons mr-3">account_balance</span>
    Loans
  </button>

          {/* Limit Page -> /limit */}
<button
  type="button"
  onClick={() => navigate("/limit")}
  className="nav-link text-left"
>
  <span className="material-icons mr-3">trending_up</span>
  Request Limit
</button>

          {/* Notifications -> /notifications */}
<button
  type="button"
  onClick={() => navigate("/notifications-list")}
  className="nav-link text-left"
>
  <span className="material-icons mr-3">notifications</span>
  Notifications
</button>

          {/* Chatbot Support -> /chatbot-support */}
<button
  type="button"
  onClick={() => navigate("/chatbot-support")}
  className="nav-link text-left"
>
  <span className="material-icons mr-3">chat</span>
  Chatbot Support
</button>

        </nav>

        <div className="mt-auto">

  {/* Profile & Security -> /profile-security */}
  <button
    type="button"
    onClick={() => navigate("/profile-security")}
    className="nav-link text-left"
  >
    <span className="material-icons mr-3">security</span>
    Profile & Security
  </button>
</div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 transition-colors duration-300">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
              Good afternoon, Siddhi
            </h2>
            <p className="text-gray-500 dark:text-gray-300 font-medium">
              Here's a quick summary of your accounts and recent activity.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Toggle Dark Mode"
            >
              <span className="material-icons text-gray-700 dark:text-gray-200">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Search Bar */}
            <div className="relative search-bar rounded-full bg-white dark:bg-gray-700 transition-all">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                search
              </span>
              <input
                className="bg-transparent pl-10 pr-4 py-2 rounded-full outline-none w-64 focus:ring-0 text-gray-700 dark:text-gray-100 font-medium"
                placeholder="Search"
                type="text"
              />
            </div>

            {/* Profile Avatar */}
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="font-medium text-gray-600 dark:text-gray-200">A</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                sessionStorage.clear();
                navigate('/login');
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Logout"
            >
              <span className="material-icons text-gray-600">logout</span>
            </button>
          </div>
        </header>

        {/* Accounts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Checking Account */}
          <div className="account-card bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-300 font-medium">
                  Checking **** 1234
                </p>
                <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                  $8,420.12
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-800 rounded-full">
                <span className="material-icons text-blue-600 dark:text-blue-200">
                  account_balance_wallet
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/transfer-step1")}
              className="gradient-button w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Transfer
            </button>
          </div>

          {/* Savings Account */}
          <div className="account-card bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-300 font-medium">
                  Savings **** 9910
                </p>
                <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                  $15,230.00
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-800 rounded-full">
                <span className="material-icons text-green-600 dark:text-green-400">
                  savings
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                navigate("/statements", { state: { fromDashboard: true } })
              }
              className="gradient-button w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Statement
            </button>
          </div>

          {/* Credit Account */}
          <div className="account-card bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-300 font-medium">
                  Credit **** 4488
                </p>
                <p className="text-3xl font-semibold text-red-500 dark:text-red-400">
                  $-420.55
                </p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-800 rounded-full">
                <span className="material-icons text-red-600 dark:text-red-200">
                  credit_card
                </span>
              </div>
            </div>
            <button className="gradient-button w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
              Pay Bill
            </button>
          </div>
        </div>

        {/* Limits & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Limits */}
          <div className="limits-card lg:col-span-1 bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Transfer Limits
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300 mb-1 font-medium">
                  <span>Daily: $5,000</span>
                  <span>Used $1,250</span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full progress-bar"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-300 mb-1 font-medium">
                  <span>Monthly: $25,000</span>
                  <span className="text-orange-500 dark:text-orange-400 font-semibold">
                    Used $8,900
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-orange-400 dark:bg-orange-300 h-2.5 rounded-full progress-bar"
                    style={{ width: "35.6%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="transactions-card lg:col-span-2 bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Recent Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                      Date
                    </th>
                    <th className="py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                      Description
                    </th>
                    <th className="py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                      Account
                    </th>
                    <th className="py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-300 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-medium">
                      2025-08-10
                    </td>
                    <td className="py-4 px-4 flex items-center">
                      <span className="material-icons text-purple-500 dark:text-purple-300 mr-3">
                        shopping_bag
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
                        Grocery Store
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Checking
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-semibold text-right">
                      -$42.16
                    </td>
                  </tr>

                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-medium">
                      2025-08-09
                    </td>
                    <td className="py-4 px-4 flex items-center">
                      <span className="material-icons text-green-500 dark:text-green-400 mr-3">
                        work
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
                        Salary
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Checking
                    </td>
                    <td className="py-4 px-4 text-sm text-green-600 dark:text-green-400 font-semibold text-right">
                      +$3,200.00
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-medium">
                      2025-08-08
                    </td>
                    <td className="py-4 px-4 flex items-center">
                      <span className="material-icons text-blue-500 dark:text-blue-300 mr-3">
                        swap_horiz
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
                        Transfer to Savings
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Savings
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-semibold text-right">
                      -$500.00
                    </td>
                  </tr>

                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-medium">
                      2025-08-07
                    </td>
                    <td className="py-4 px-4 flex items-center">
                      <span className="material-icons text-yellow-500 dark:text-yellow-400 mr-3">
                        lightbulb
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
                        Electricity
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Checking
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-semibold text-right">
                      -$88.12
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-medium">
                      2025-08-06
                    </td>
                    <td className="py-4 px-4 flex items-center">
                      <span className="material-icons text-red-500 dark:text-red-400 mr-3">
                        atm
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
                        ATM Withdrawal
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Checking
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-100 font-semibold text-right">
                      -$60.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Help Button */}
        {/* Help Button - stays fixed on bottom right */}
<button
  onClick={() => navigate("/Faq")}
  className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
>
  <span className="material-icons text-3xl">help_outline</span>
</button>

      </main>
    </div>
  );
}
