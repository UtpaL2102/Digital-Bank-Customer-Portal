// src/components/AccountDetails.jsx
import React, { useState } from "react";
import StatementsPage from "../pages/StatementsPage"; // import the statements page
import "../AccountDetails.css";

export default function AccountDetails() {
  const [activeTab, setActiveTab] = useState("Overview");

  const allTransactions = [
    { date: "2025-08-10", desc: "Transfer to Savings", type: "Transfer", status: "Completed", ref: "TRX-22481", amount: "-$500.00" },
    { date: "2025-08-09", desc: "Salary", type: "Credit", status: "Completed", ref: "TRX-22462", amount: "+$3,200.00", color: "green" },
    { date: "2025-08-08", desc: "Grocery", type: "Debit", status: "Completed", ref: "TRX-22422", amount: "-$42.16" },
    { date: "2025-08-07", desc: "Electricity", type: "Debit", status: "Completed", ref: "TRX-22390", amount: "-$88.12" },
    { date: "2025-08-06", desc: "ATM Withdrawal", type: "Debit", status: "Completed", ref: "TRX-22358", amount: "-$60.00" },
    { date: "2025-08-05", desc: "Mobile Recharge", type: "Debit", status: "Completed", ref: "TRX-22330", amount: "-$12.00" },
  ];

  const [transactions, setTransactions] = useState(allTransactions);
  const [filters, setFilters] = useState({
    dateRange: "Last 30 days",
    type: "All",
    status: "All",
  });

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    let filtered = allTransactions;

    if (newFilters.type !== "All") filtered = filtered.filter(tx => tx.type === newFilters.type);
    if (newFilters.status !== "All") filtered = filtered.filter(tx => tx.status === newFilters.status);

    const now = new Date("2025-08-10");
    let days = 30;
    if (newFilters.dateRange === "Last 60 days") days = 60;
    if (newFilters.dateRange === "Last 90 days") days = 90;
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days + 1);

    filtered = filtered.filter(tx => new Date(tx.date) >= startDate && new Date(tx.date) <= now);

    setTransactions(filtered);
  };

  const downloadCSV = () => {
    const headers = ["Date", "Description", "Type", "Status", "Reference", "Amount"];
    const rows = transactions.map(tx => [tx.date, tx.desc, tx.type, tx.status, tx.ref, tx.amount]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold text-gray-900">Digital Bank</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account details</h1>

        {/* Account Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Checking •••• 1234</h2>
            <div className="text-sm text-gray-500 mt-2">
              <p>Status: <span className="text-green-500 font-medium">Active</span> • Opened: 2023-05-20</p>
              <p>Branch: Main (001)</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="text-sm text-gray-500">Available balance</p>
            <p className="text-3xl font-bold text-gray-900">$8,420.12</p>
            <button className="gradient-button text-white font-semibold py-2 px-6 rounded-lg mt-4 shadow-sm">New transfer</button>
          </div>
        </div>

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
        {activeTab === "Overview" && <div>Overview content here...</div>}
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

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
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
                  {transactions.map((tx, idx) => (
                    <tr key={idx} className={`table-row-alt border-b ${tx.color === "green" ? "text-green-600" : ""}`}>
                      <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{tx.desc}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{tx.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{tx.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{tx.ref}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-right font-semibold ${tx.color === "green" ? "text-green-600" : ""}`}>
                        {tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Statements tab */}
        {activeTab === "Statements" && <StatementsPage />}
      </main>
    </div>
  );
}
