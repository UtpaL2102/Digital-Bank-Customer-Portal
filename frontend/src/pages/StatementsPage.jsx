// src/pages/StatementsPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "../StatementsPage.css";

export default function StatementsPage() {
  const location = useLocation();
  const showHeader = location.state?.fromDashboard || false;

  const statements = [
    { range: "2025-07-01 → 2025-07-31", format: "PDF", delivery: "Email + Download", status: "Completed", downloadable: true },
    { range: "2025-06-01 → 2025-06-30", format: "CSV", delivery: "Download", status: "Pending", downloadable: false },
    { range: "2025-05-01 → 2025-05-31", format: "PDF", delivery: "Email", status: "Completed", downloadable: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {showHeader && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Digital Bank</h1>
          </div>
        </header>
      )}

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Statements</h2>
          </div>

          {/* Generate Statement Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
              <div className="lg:col-span-2">
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                    account_balance_wallet
                  </span>
                  <input
                    className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none"
                    type="text"
                    value="Account: Checking ****1234"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">date_range</span>
                  <input className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none" placeholder="From date" type="text" />
                </div>
              </div>

              <div>
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">date_range</span>
                  <input className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none" placeholder="To date" type="text" />
                </div>
              </div>

              <div>
                <div className="relative input-chip">
                  <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">description</span>
                  <input className="w-full bg-transparent pl-8 pr-4 py-1 text-gray-700 focus:outline-none" type="text" value="Format: PDF" readOnly />
                </div>
              </div>

              <div className="lg:col-span-1 grid grid-cols-2 gap-2">
                <button className="w-full col-span-2 md:col-span-1 lg:col-span-2 btn-primary text-white font-semibold py-2.5 px-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                  Generate
                </button>
                <button className="w-full col-span-2 md:col-span-1 lg:col-span-2 bg-gray-100 text-gray-700 font-semibold py-2.5 px-4 rounded-full hover:bg-gray-200 transition-colors duration-300">
                  Email copy to me
                </button>
              </div>
            </div>
          </div>

          {/* Statements Table Card */}
          <div className="table-card overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">Generated statements</h3>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statements.map((s, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.range}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.format}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.delivery}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${s.status === "Completed" ? "bg-green-100 text-green-800" : "bg-orange-100"}`} style={{ color: s.status === "Pending" ? "#FF8040" : "" }}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {s.downloadable ? (
                          <a className="text-indigo-600 hover:text-indigo-900 flex items-center group" href="#">
                            <span className="material-icons mr-1 text-lg group-hover:text-indigo-900">file_download</span> Get PDF
                          </a>
                        ) : (
                          <span className="text-gray-400">Not available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {statements.map((s, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{s.range}</p>
                      <p className="text-sm text-gray-500">{s.format} • {s.delivery}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${s.status === "Completed" ? "bg-green-100 text-green-800" : "bg-orange-100"}`} style={{ color: s.status === "Pending" ? "#FF8040" : "" }}>
                      {s.status}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${s.downloadable ? "text-white bg-indigo-600 hover:bg-indigo-700" : "text-gray-700 bg-white border-gray-300 cursor-not-allowed"}`}
                      disabled={!s.downloadable}
                    >
                      <span className="material-icons mr-2 text-lg">{s.downloadable ? "file_download" : "hourglass_empty"}</span>
                      {s.downloadable ? "Download" : "Generating..."}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
