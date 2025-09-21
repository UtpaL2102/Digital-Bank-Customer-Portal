import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../TransferSuccess.css";
import { accounts } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import { formatCurrency } from "../lib/currencyHelpers";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import jsPDF from "jspdf";

export default function TransferSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // States
  const [error, setError] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", severity: "success" });
  
  // Transfer data from navigation state
  const transfer = location.state;
  
  // Account masking helper
  const mask = (v) => v ? `•••• ${String(v).slice(-4)}` : '••••••';

  // Status mapping
  const statusMap = {
    completed: { 
      label: 'Complete', 
      cls: 'bg-green-100 text-green-800',
      message: 'Your transfer has been completed successfully.'
    },
    pending: { 
      label: 'Submitted', 
      cls: 'bg-yellow-100 text-yellow-800',
      message: 'Your transfer was successfully created and is processing.'
    },
    failed: { 
      label: 'Failed', 
      cls: 'bg-red-100 text-red-800',
      message: 'Your transfer could not be completed.'
    },
    cancelled: { 
      label: 'Cancelled', 
      cls: 'bg-gray-100 text-gray-800',
      message: 'Your transfer has been cancelled.'
    },
    success: { 
      label: 'Complete', 
      cls: 'bg-green-100 text-green-800',
      message: 'Your transfer has been completed successfully.'
    },
    default: { 
      label: 'Processing', 
      cls: 'bg-blue-100 text-blue-800',
      message: 'Your transfer is being processed.'
    }
  };

  const getStatusInfo = (status) => statusMap[status?.toLowerCase()] || statusMap.default;

  // Validate transfer data on mount and try session storage backup
  useEffect(() => {
    let transferData = transfer;
    
    // If no transfer data in state, try session storage
    if (!transferData) {
      try {
        const savedTransfer = sessionStorage.getItem('last_transfer');
        if (savedTransfer) {
          transferData = JSON.parse(savedTransfer);
          // Clear after retrieval
          sessionStorage.removeItem('last_transfer');
        }
      } catch (err) {
        console.error('Error reading transfer from session storage:', err);
      }
    }
    
    if (!transferData) {
      setError("No transfer details found. Please start a new transfer.");
      return;
    }
    
    // Validate required fields
    const requiredFields = ["transactionId", "amount", "fromAccount", "toBeneficiary", "status"];
    const missingFields = requiredFields.filter(field => !transferData[field]);
    
    if (missingFields.length > 0) {
      setError(`Invalid transfer data. Missing: ${missingFields.join(", ")}`);
      return;
    }
  }, [transfer]);

  // Handle receipt download
  const downloadReceipt = async () => {
    if (!transfer?.transactionId) {
      setNotification({
        show: true,
        message: "Cannot generate receipt: Missing transaction ID",
        severity: "error"
      });
      return;
    }

    try {
      setDownloadProgress(true);
      const token = getAuthToken();

      // Try server-side receipt if statementId is available
      if (transfer.statementId) {
        try {
          const downloadToken = await accounts.getStatementDownloadToken(transfer.statementId, token);
          const signedUrl = await accounts.getStatementSignedUrl(transfer.statementId, downloadToken, token);
          
          // Trigger download
          const link = document.createElement('a');
          link.href = signedUrl;
          link.download = `transfer-${transfer.transactionId}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setNotification({
            show: true,
            message: "Receipt downloaded successfully",
            severity: "success"
          });
          return;
        } catch (serverError) {
          console.warn('Server-side receipt failed, falling back to client-side generation:', serverError);
        }
      }

      // Generate PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header
      doc.setFontSize(20);
      doc.text("Digital Bank", pageWidth/2, 20, { align: "center" });
      doc.setFontSize(16);
      doc.text("Transfer Receipt", pageWidth/2, 30, { align: "center" });
      
      // Transfer Details
      doc.setFontSize(12);
      const startY = 50;
      const lineHeight = 10;
      let currentY = startY;
      
      doc.text(`Transaction ID: ${transfer.transactionId}`, 20, currentY);
      currentY += lineHeight;
      
      doc.text(`Date: ${new Date(transfer.scheduledAt || Date.now()).toLocaleString()}`, 20, currentY);
      currentY += lineHeight;
      
      doc.text(`From: ${transfer.fromAccount?.account_type || 'Account'} ${mask(transfer.fromAccount?.account_number)}`, 20, currentY);
      currentY += lineHeight;
      
      doc.text(`To: ${transfer.toBeneficiary?.name || 'Beneficiary'} - ${mask(transfer.toBeneficiary?.account_number)}`, 20, currentY);
      currentY += lineHeight;
      
      doc.text(`Amount: ${formatCurrency(transfer.amount)}`, 20, currentY);
      currentY += lineHeight;
      
      doc.text(`Status: ${transfer.status.toUpperCase()}`, 20, currentY);
      currentY += lineHeight;
      
      if (transfer.description) {
        doc.text(`Description: ${transfer.description}`, 20, currentY);
      }
      
      // Save and download
      doc.save(`transfer-${transfer.transactionId}.pdf`);
      
      setNotification({
        show: true,
        message: "Receipt downloaded successfully",
        severity: "success"
      });
    } catch (err) {
      console.error("Error generating receipt:", err);
      setNotification({
        show: true,
        message: "Failed to generate receipt",
        severity: "error"
      });
    } finally {
      setDownloadProgress(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="error-icon w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <span className="material-icons text-red-500 text-6xl">error</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Transfer Error</h2>
            <p className="text-gray-500 mb-8">{error}</p>
            <button
              className="gradient-button w-full text-white font-semibold py-3 px-4 rounded-lg"
              onClick={() => navigate("/transfer")}
            >
              Start New Transfer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transfer-success-page bg-gray-50 min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      {/* <header className="transfer-header fixed top-0 left-0 w-full bg-white border-b border-gray-200 py-4 px-6">
        <h1 className="text-xl font-semibold text-gray-800">Digital Bank</h1>
      </header> */}

      <main className="mt-20 w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="success-icon w-24 h-24 rounded-full flex items-center justify-center mb-6">
              <span className="material-icons text-white text-6xl">check</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Transfer {getStatusInfo(transfer.status).label}</h2>
            <p className="text-gray-500 mt-2">
              {getStatusInfo(transfer.status).message}
            </p>
          </div>

          <div className="transfer-summary bg-white rounded-lg shadow-sm border border-gray-100 mt-8">
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-500 text-sm">Reference</span>
                <span className="font-medium text-gray-800">{transfer.transactionId}</span>
              </div>
              <div className="bg-gray-50 rounded-md flex justify-between items-center py-3 px-4 -mx-4 sm:-mx-6">
                <span className="text-gray-500 text-sm">From</span>
                <span className="font-medium text-gray-800">
                  {transfer.fromAccount?.account_type || 'Account'} {mask(transfer.fromAccount?.account_number)}
                </span>
              </div>
              {transfer.fromAccount?.balance !== undefined && (
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 text-sm">Available Balance</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(transfer.fromAccount.balance)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-500 text-sm">To</span>
                <span className="font-medium text-gray-800">
                  {transfer.toBeneficiary?.name || 'Beneficiary'} - {mask(transfer.toBeneficiary?.account_number)}
                </span>
              </div>
              {transfer.toBeneficiary?.bank_name && (
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 text-sm">Bank</span>
                  <span className="font-medium text-gray-800">
                    {transfer.toBeneficiary.bank_name}
                  </span>
                </div>
              )}
              <div className="bg-gray-50 rounded-md flex justify-between items-center py-3 px-4 -mx-4 sm:-mx-6">
                <span className="text-gray-500 text-sm">Amount</span>
                <span className="font-bold text-lg text-orange-500">{formatCurrency(transfer.amount)}</span>
              </div>
              {transfer.scheduledAt && (
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 text-sm">Scheduled For</span>
                  <span className="font-medium text-gray-800">
                    {new Date(transfer.scheduledAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {transfer.description && (
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500 text-sm">Description</span>
                  <span className="font-medium text-gray-800">{transfer.description}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-500 text-sm">Status</span>
                <span className={`font-medium px-3 py-1 rounded-full text-sm ${getStatusInfo(transfer.status).cls}`}>
                  {getStatusInfo(transfer.status).label}
                </span>
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
              onClick={() => navigate("/transfer")}
            >
              New Transfer
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              className={`text-sm ${
                downloadProgress 
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-500 hover:text-gray-800 underline'
              } transition-colors`}
              onClick={downloadReceipt}
              disabled={downloadProgress}
            >
              {downloadProgress ? (
                <span className="flex items-center justify-center">
                  <CircularProgress size={16} className="mr-2" />
                  Generating receipt...
                </span>
              ) : (
                "Download receipt (PDF)"
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Notifications */}
      <Snackbar
        open={notification.show}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, show: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, show: false })} 
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
