// src/pages/LoansOverviewPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function LoansOverviewPage() {
  const navigate = useNavigate();
  
  // State management
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loanSchedule, setLoanSchedule] = useState(null);
  const [downloadingSchedule, setDownloadingSchedule] = useState(false);

  // Load loans data
  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      setListError("");
      setDetailsError("");
      const token = getAuthToken();
      const response = await api.loans.listLoans(token);
      console.log("API Response:", response);
      
      // API returns { loans: [...] }
      const items = response.loans || [];
      setLoans(items);
      
      // Find first active loan using case-insensitive status check
      const activeLoan = items.find(loan => (loan.status || '').toLowerCase() === 'active');
      if (activeLoan) {
        handleViewDetails(activeLoan.id);
      }
    } catch (err) {
      console.error("Failed to load loans:", err);
      setListError("Failed to load loans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (loanId) => {
    if (!loanId) {
      setSelectedLoan(null);
      setLoanSchedule(null);
      return;
    }

    try {
      setDetailsError("");
      setLoadingDetails(true);
      setLoadingSchedule(true);
      const token = getAuthToken();
      
      // Set basic loan info immediately from the list
      const basicLoan = loans.find(l => l.id === loanId);
      if (basicLoan) {
        setSelectedLoan({ ...basicLoan, loading: true });
      }
      
      // Load details and schedule in parallel
      try {
        const [details, scheduleResponse] = await Promise.all([
          api.loans.getLoanDetails(loanId, token),
          api.loans.getRepaymentSchedule(loanId, token)
        ]);
        
        console.log('Schedule response:', scheduleResponse);
        
        // If we get both successfully, update both states
        setSelectedLoan({ ...(details.loan || details), loading: false });
        setLoanSchedule(scheduleResponse.schedule); // The schedule object contains monthly_payment, term_months, and schedule array
      } catch (err) {
        console.error("Error fetching loan details/schedule:", err);
        setDetailsError("Failed to load loan information. Please try again.");
      }
    } catch (err) {
      console.error("Failed to load loan details:", err);
      setDetailsError("Failed to load loan details. Please try again.");
      setSelectedLoan(null);
      setLoanSchedule(null);
    } finally {
      setLoadingDetails(false);
      setLoadingSchedule(false);
    }
  };

  const handleDownloadSchedule = async (format) => {
    try {
      setDownloadingSchedule(true);
      setDownloadError("");
      const token = getAuthToken();
      
      // Get the schedule data
      const scheduleData = await api.loans.getRepaymentSchedule(selectedLoan.id, token);
      
      // Format the schedule data based on selected format
      let content;
      let mimeType;
      let fileName;

      switch (format) {
        case 'csv': {
          const headers = ['Installment', 'Due Date', 'Principal', 'Interest', 'Total Payment', 'Remaining Balance'];
          const rows = scheduleData.schedule.schedule.map(installment => [
            installment.installment_number,
            new Date(installment.due_date).toLocaleDateString(),
            fmt(installment.principal),
            fmt(installment.interest),
            fmt(installment.total_payment),
            fmt(installment.remaining_balance)
          ]);
          
          content = [
            headers.join(','),
            ...rows.map(row => row.join(','))
          ].join('\n');
          
          mimeType = 'text/csv';
          fileName = 'repayment-schedule.csv';
          break;
        }

        case 'pdf': {
          // Create PDF content with loan details and schedule
          const { jsPDF } = await import('jspdf');
          const doc = new jsPDF();
          
          // Add title
          doc.setFontSize(16);
          doc.text('Loan Repayment Schedule', 20, 20);
          
          // Add loan details
          doc.setFontSize(12);
          doc.text(`Loan ID: ${selectedLoan.id}`, 20, 35);
          doc.text(`Principal Amount: ${fmt(selectedLoan.amount)}`, 20, 45);
          doc.text(`Interest Rate: ${selectedLoan.interest_rate}%`, 20, 55);
          doc.text(`Term: ${scheduleData.schedule.term_months} months`, 20, 65);
          doc.text(`Monthly Payment: ${fmt(scheduleData.schedule.monthly_payment)}`, 20, 75);
          
          // Add schedule table
          const headers = ['#', 'Due Date', 'Principal', 'Interest', 'Payment', 'Balance'];
          const startY = 90;
          const lineHeight = 10;
          
          // Add header row
          headers.forEach((header, i) => {
            doc.text(header, 20 + i * 30, startY);
          });
          
          // Add schedule rows
          scheduleData.schedule.schedule.forEach((row, i) => {
            const y = startY + ((i + 1) * lineHeight);
            if (y >= 280) { // Add new page if near bottom
              doc.addPage();
              headers.forEach((header, j) => {
                doc.text(header, 20 + j * 30, 20);
              });
              y = 30 + lineHeight;
            }
            
            doc.text(String(row.installment_number), 20, y);
            doc.text(new Date(row.due_date).toLocaleDateString(), 50, y);
            doc.text(fmt(row.principal), 80, y);
            doc.text(fmt(row.interest), 110, y);
            doc.text(fmt(row.total_payment), 140, y);
            doc.text(fmt(row.remaining_balance), 170, y);
          });
          
          content = doc.output('blob');
          mimeType = 'application/pdf';
          fileName = 'repayment-schedule.pdf';
          break;
        }

        case 'json': {
          content = JSON.stringify(scheduleData, null, 2);
          mimeType = 'application/json';
          fileName = 'repayment-schedule.json';
          break;
        }

        default:
          throw new Error('Unsupported format');
      }
      
      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download schedule:", err);
      setDownloadError("Failed to download repayment schedule. Please try again.");
    } finally {
      setDownloadingSchedule(false);
    }
  };

  // Keep the existing dummy loans array for TypeScript/IDE type hints, but don't use it
  const dummyLoans = [
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

  // Normalize loan fields
  const norm = (loan) => ({
    principal: loan.principal || loan.amount || 0,
    rate: loan.rate || loan.interest_rate || 0,
    termMonths: loan.term_months || loan.termMonths || 0,
    status: (loan.status || '').toLowerCase()
  });

  // EMI calculation formula
  const calcEMI = (P, annualRate, n) => {
    if (!P || !n) return 0;
    const r = (annualRate || 0) / 100 / 12;
    if (r === 0) return P / n;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const activeLoans = useMemo(
    () => loans.filter((l) => norm(l).status === "active"),
    [loans]
  );

  const totalOutstanding = useMemo(
    () => activeLoans.reduce((sum, l) => {
      const { principal } = norm(l);
      return sum + principal;
    }, 0),
    [activeLoans]
  );

  const totalMonthlyEMI = useMemo(
    () => activeLoans.reduce((sum, l) => {
      const { principal, rate, termMonths } = norm(l);
      return sum + calcEMI(principal, rate, termMonths);
    }, 0),
    [activeLoans]
  );

  const fmt = (v) =>
    new Intl.NumberFormat("en-IN", { 
      style: "currency", 
      currency: "INR",
      maximumFractionDigits: 0, // No decimal places for Rupees
    }).format(v);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Digital Bank</h1>
            <div className="text-sm text-gray-500">Loans Overview</div>
          </div>
        </div>
      </header> */}

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

              {listError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex items-center">
                      <p className="text-sm text-red-600">{listError}</p>
                      <button
                        className="ml-4 inline-flex rounded-md px-3 py-1.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => { setListError(''); loadLoans(); }}
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6 overflow-x-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  </div>
                ) : (
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
                      {loans.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-8 text-gray-500">
                            No loans found
                          </td>
                        </tr>
                      ) : (
                        loans.map((loan, idx) => (
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
                              {fmt(loan.amount || loan.principal)}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                              {loan.rate || loan.interest_rate}%
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                              {loan.start_date || loan.start}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                              {loan.end_date || loan.end}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                              {loan.status}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => handleViewDetails(loan.id)}
                                className="text-[#0046FF] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loadingDetails && selectedLoan === loan.id}
                              >
                                {loadingDetails && selectedLoan === loan.id ? 
                                  'Loading...' : 'View Details'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
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
                Loan details {selectedLoan ? `— ${selectedLoan.id}` : ""}
              </h3>

              <div className="space-y-3 text-sm">
                {loadingDetails ? (
                  <div className="flex justify-center items-center py-4">
                    <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  </div>
                ) : selectedLoan ? (
                  <>
                    <p>
                      <span className="font-bold text-gray-900">Principal:</span>{" "}
                      {fmt(selectedLoan.amount)} •{" "}
                      <span className="font-bold text-gray-900">Rate:</span>{" "}
                      {selectedLoan.interest_rate}%
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">Term:</span>{" "}
                      {selectedLoan.term_months || "N/A"} months
                    </p>
                    <p>
                      <span className="font-bold text-gray-900">Next payment:</span>{" "}
                      <span className="text-[#FF8040] font-bold">
                        {selectedLoan.next_payment_date || "N/A"}
                      </span>
                    </p>
                    {selectedLoan.disbursement_date && (
                      <p>
                        <span className="font-bold text-gray-900">Disbursed on:</span>{" "}
                        {selectedLoan.disbursement_date}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">Select a loan to view details</p>
                )}
              </div>

              <div className="mt-6 border border-gray-200 rounded-lg shadow-sm p-4 h-40 overflow-auto">
                {loadingSchedule ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-2">
                      <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span className="text-sm text-gray-500">Loading schedule...</span>
                    </div>
                  </div>
                ) : selectedLoan && loanSchedule ? (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Repayment Schedule</h4>
                    <div className="space-y-1">
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Monthly Payment: <span className="font-medium">{fmt(loanSchedule.monthly_payment)}</span></p>
                        <p className="text-sm text-gray-600">Term: <span className="font-medium">{loanSchedule.term_months} months</span></p>
                      </div>
                      {loanSchedule.schedule.slice(0, 4).map((installment, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{new Date(installment.due_date).toLocaleDateString()}</span>
                          <span className="font-medium">{fmt(installment.total_payment)}</span>
                        </div>
                      ))}
                      {loanSchedule.schedule.length > 4 && (
                        <p className="text-sm text-gray-500 text-center mt-2">
                          + {loanSchedule.schedule.length - 4} more installments
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">
                      Select a loan to view schedule
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => selectedLoan && handleDownloadSchedule('csv')}
                    disabled={!selectedLoan || downloadingSchedule}
                    className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {downloadingSchedule ? "..." : "CSV"}
                  </button>
                  <button
                    onClick={() => selectedLoan && handleDownloadSchedule('pdf')}
                    disabled={!selectedLoan || downloadingSchedule}
                    className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {downloadingSchedule ? "..." : "PDF"}
                  </button>
                  <button
                    onClick={() => selectedLoan && handleDownloadSchedule('json')}
                    disabled={!selectedLoan || downloadingSchedule}
                    className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {downloadingSchedule ? "..." : "JSON"}
                  </button>
                </div>
                {downloadError && (
                  <p className="text-sm text-red-600 text-center">{downloadError}</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
