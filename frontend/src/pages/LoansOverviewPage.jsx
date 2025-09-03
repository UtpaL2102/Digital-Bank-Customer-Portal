// src/pages/LoansOverviewPage.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function LoansOverviewPage() {
  const navigate = useNavigate();

  // demo data (replace with API data when available)
  const loans = [
    {
      id: "LN-10021",
      principal: 10000,
      amount: 10000,
      rate: 8.5,
      start: "2024-05-01",
      end: "2027-05-01",
      status: "Active",
      termMonths: 36,
    },
    {
      id: "LN-10005",
      principal: 4000,
      amount: 4000,
      rate: 10.0,
      start: "2023-01-20",
      end: "2025-01-20",
      status: "Closed",
      termMonths: 24,
    },
  ];

  // EMI calculation formula
  const calcEMI = (P, annualRate, n) => {
    const r = annualRate / 100 / 12;
    if (r === 0) return P / n;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const activeLoans = useMemo(() => loans.filter((l) => l.status === "Active"), [loans]);
  const totalOutstanding = useMemo(
    () => activeLoans.reduce((sum, l) => sum + l.principal, 0),
    [activeLoans]
  );
  const totalMonthlyEMI = useMemo(
    () => activeLoans.reduce((sum, l) => sum + calcEMI(l.principal, l.rate, l.termMonths), 0),
    [activeLoans]
  );

  const fmt = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Digital Bank</h1>
            <div className="text-sm text-gray-500">Loans Overview</div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Loans</h2>
            <div className="flex gap-3">
              {/* Apply Loan Button */}
              <button
  onClick={() => navigate("/apply-loan")}
  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity"
>
  Apply for New Loan
</button>


              
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Loan Table */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your loans</h3>

              <div className="mb-6 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Loan ID
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rate
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan, idx) => (
                      <tr
                        key={loan.id}
                        className={`hover:bg-gray-50 ${
                          idx % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white"
                        }`}
                      >
                        <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {loan.id}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {fmt(loan.amount)}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.rate}%
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.start}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.end}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.status}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => alert(`View details — future page for ${loan.id}`)}
                            className="text-[#0046FF] hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* EMI Summary */}
              <div className="border-t border-gray-100 pt-4 space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">EMI Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total outstanding</p>
                    <p className="text-xl font-bold text-gray-900">{fmt(totalOutstanding)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Estimated monthly EMI</p>
                    <p className="text-xl font-bold text-gray-900">{fmt(totalMonthlyEMI)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Active loans</p>
                    <p className="text-xl font-bold text-gray-900">{activeLoans.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <aside className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Loan details —{" "}
                <span className="font-bold">{activeLoans[0]?.id || "—"}</span>
              </h3>

              <div className="space-y-3 text-sm">
                {activeLoans[0] ? (
                  <>
                    <p>
                      <span className="font-bold text-gray-900">Principal:</span>{" "}
                      {fmt(activeLoans[0].principal)} •{" "}
                      <span className="font-bold text-gray-900">Rate:</span>{" "}
                      {activeLoans[0].rate}%
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">Term:</span>{" "}
                      {activeLoans[0].termMonths} months
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">Next payment:</span>{" "}
                      <span className="text-[#FF8040] font-bold">2025-09-01</span>
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">No active loans.</p>
                )}
              </div>

              <div className="mt-6 border border-gray-200 rounded-lg shadow-sm p-4 h-40 flex items-center justify-center">
                <p className="text-gray-500">Amortization schedule (placeholder)</p>
              </div>

              <button
                onClick={() => alert("Download schedule - feature coming soon")}
                className="mt-6 w-full bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition-opacity"
              >
                Download schedule
              </button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
