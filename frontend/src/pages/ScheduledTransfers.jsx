import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../ScheduledTransfers.css";
import { 
  accounts as accountsApi,
  beneficiaries as beneficiariesApi,
  transfers as transfersApi
} from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import { formatCurrency } from "../lib/currencyHelpers";
import { 
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from "@mui/material";

export default function ScheduledTransfers() {
  const navigate = useNavigate();
  
  // Data states
  const [scheduledTransfers, setScheduledTransfers] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingAction, setPendingAction] = useState({ id: null, type: null });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", severity: "success" });
  
  // Form state
  const [formData, setFormData] = useState({
    fromAccount: "",
    beneficiary: "",
    amount: "",
    frequency: "monthly",
    nextRunDate: new Date().toISOString().split('T')[0],
    description: ""
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Data fetching
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
        const [accountsData, beneficiariesData, transfersData] = await Promise.all([
          accountsApi.getAccountsList(token),
          beneficiariesApi.listBeneficiaries(token),
          transfersApi.listScheduledTransfers(token)
        ]);
      // Normalize responses with robust fallbacks
      const normalizeList = (resp) => Array.isArray(resp) ? resp : (resp?.items || resp?.data || resp?.scheduled_transfers || resp?.accounts || resp?.beneficiaries || []);
      setAccountList(normalizeList(accountsData));
      setBeneficiaryList(normalizeList(beneficiariesData));
      setScheduledTransfers(normalizeList(transfersData));
      
      setError(null);
    } catch (err) {
      console.error("Error fetching scheduled transfers data:", err);
      setError(err.message || "Failed to load scheduled transfers");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Form validation
  const validateForm = (data) => {
    const errors = {};
    
    if (!data.fromAccount) {
      errors.fromAccount = "Please select a source account";
    }
    if (!data.beneficiary) {
      errors.beneficiary = "Please select a beneficiary";
    }
    if (!data.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      errors.amount = "Please enter a valid amount";
    }
    if (!data.frequency) {
      errors.frequency = "Please select a frequency";
    }
    if (!data.nextRunDate) {
      errors.nextRunDate = "Next run date is required";
    } else {
      const today = new Date();
      today.setHours(0,0,0,0);
      const next = new Date(data.nextRunDate);
      if (next < today) {
        errors.nextRunDate = "Next run date cannot be in the past";
      }
    }
    if (!data.description?.trim()) {
      errors.description = "Description is required";
    }

    return errors;
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    setFormErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleCreateTransfer = async (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const token = getAuthToken();
      const transferData = {
        from_account_id: formData.fromAccount,
        to_beneficiary_id: formData.beneficiary,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        next_run_date: formData.nextRunDate,
        description: formData.description
      };

      const result = editingTransfer
        ? await transfersApi.updateScheduledTransfer(editingTransfer.id, transferData, token)
        : await transfersApi.createScheduledTransfer(transferData, token);

      setNotification({
        show: true,
        message: `Transfer successfully ${editingTransfer ? "updated" : "created"}`,
        severity: "success"
      });
      
      setShowCreateModal(false);
      setEditingTransfer(null);
      setFormData({
        fromAccount: "",
        beneficiary: "",
        amount: "",
        frequency: "monthly",
        nextRunDate: new Date().toISOString().split('T')[0],
        description: ""
      });
      
      // Refresh data
      fetchData();
    } catch (err) {
      console.error("Error creating/updating transfer:", err);
      setNotification({
        show: true,
        message: err.message || `Failed to ${editingTransfer ? "update" : "create"} transfer`,
        severity: "error"
      });
    }
  };

  // Transfer actions
  const handlePauseResume = async (transfer) => {
    try {
      setPendingAction({ id: transfer.id, type: 'status' });
      const token = getAuthToken();
      if (transfer.status === "active") {
        await transfersApi.pauseScheduledTransfer(transfer.id, token);
      } else {
        await transfersApi.resumeScheduledTransfer(transfer.id, token);
      }

      setNotification({
        show: true,
        message: `Transfer ${transfer.status === "active" ? "paused" : "resumed"} successfully`,
        severity: "success"
      });
      
      // Refresh data
      await fetchData();
    } catch (err) {
      console.error("Error updating transfer status:", err);
      setNotification({
        show: true,
        message: err.message || "Failed to update transfer status",
        severity: "error"
      });
    } finally {
      setPendingAction({ id: null, type: null });
    }
  };

  const handleEdit = (transfer) => {
    setEditingTransfer(transfer);
    setFormData({
      fromAccount: transfer.from_account_id,
      beneficiary: transfer.to_beneficiary_id,
      amount: transfer.amount.toString(),
      frequency: transfer.frequency,
      nextRunDate: transfer.next_run_date?.split('T')[0] || '',
      description: transfer.description
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (transfer) => {
    if (!window.confirm("Are you sure you want to cancel this scheduled transfer?")) {
      return;
    }

    try {
      const token = getAuthToken();
      await transfersApi.cancelScheduledTransfer(transfer.id, token);

      setNotification({
        show: true,
        message: "Transfer cancelled successfully",
        severity: "success"
      });
      
      // Refresh data
      fetchData();
    } catch (err) {
      console.error("Error cancelling transfer:", err);
      setNotification({
        show: true,
        message: err.message || "Failed to cancel transfer",
        severity: "error"
      });
    }
  };
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Scheduled Transfers</h1>
            <p className="text-gray-500 mt-1">Manage your automated transfers</p>
          </div>
          <button 
            onClick={() => {
              setEditingTransfer(null);
              setFormData({
                fromAccount: accountList[0]?.id || "",
                beneficiary: beneficiaryList[0]?.id || "",
                amount: "",
                frequency: "monthly",
                nextRunDate: new Date().toISOString().split('T')[0],
                description: ""
              });
              setShowCreateModal(true);
            }}
            className="gradient-btn text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4 sm:mt-0"
          >
            New Scheduled Transfer
          </button>
        </div>

        {/* Table / Cards */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-6 text-sm font-medium text-gray-500">Next Run</th>
                  <th className="p-6 text-sm font-medium text-gray-500">From</th>
                  <th className="p-6 text-sm font-medium text-gray-500">To</th>
                  <th className="p-6 text-sm font-medium text-gray-500">Amount</th>
                  <th className="p-6 text-sm font-medium text-gray-500">Frequency</th>
                  <th className="p-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="p-6 text-sm font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-6 text-center">
                      <CircularProgress />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="p-6">
                      <Alert severity="error">{error}</Alert>
                    </td>
                  </tr>
                ) : scheduledTransfers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-500">
                      No scheduled transfers found
                    </td>
                  </tr>
                ) : (
                  scheduledTransfers.map((transfer, index) => {
                    const fromAccount = accountList.find(a => a.id === transfer.from_account_id);
                    const toBeneficiary = beneficiaryList.find(b => b.id === transfer.to_beneficiary_id);

                    return (
                      <tr key={transfer.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200`}>
                        <td className="p-6 font-semibold text-gray-800">{transfer.next_run_date}</td>
                        <td className="p-6 text-gray-600">
                          {fromAccount ? `${fromAccount.account_type} ••••${fromAccount.account_number.slice(-4)}` : '—'}
                        </td>
                        <td className="p-6 text-gray-600">
                          {toBeneficiary ? `${toBeneficiary.name} - ••••${toBeneficiary.account_number.slice(-4)}` : '—'}
                        </td>
                        <td className="p-6 font-bold text-lg text-orange-500">
                          {formatCurrency(transfer.amount)}
                        </td>
                        <td className="p-6 text-gray-600 flex items-center">
                          <span className="material-icons text-gray-400 mr-2">calendar_today</span> 
                          {transfer.frequency.charAt(0).toUpperCase() + transfer.frequency.slice(1)}
                        </td>
                        <td className="p-6">
                          <span className={`status-pill status-${transfer.status} flex items-center`}>
                            <span className={`material-icons text-sm mr-1 ${
                              transfer.status === 'active' ? 'text-green-500' : 'text-yellow-500'
                            }`}>fiber_manual_record</span>
                            {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <div className="action-icon">
                              <button
                                onClick={() => handlePauseResume(transfer)}
                                disabled={pendingAction.id === transfer.id}
                                className={`p-2 rounded-full ${
                                  pendingAction.id === transfer.id 
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                                } transition-colors duration-200`}
                              >
                                {pendingAction.id === transfer.id && pendingAction.type === 'status' ? (
                                  <CircularProgress size={24} />
                                ) : (
                                  <span className="material-icons">
                                    {transfer.status === 'active' ? 'pause' : 'play_arrow'}
                                  </span>
                                )}
                              </button>
                              <span className="tooltip">
                                {transfer.status === 'active' ? 'Pause' : 'Resume'}
                              </span>
                            </div>
                            <div className="action-icon">
                              <button 
                                onClick={() => handleEdit(transfer)}
                                className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                              >
                                <span className="material-icons">edit</span>
                              </button>
                              <span className="tooltip">Edit</span>
                            </div>
                            <div className="action-icon">
                              <button 
                                onClick={() => handleDelete(transfer)}
                                className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                              >
                                <span className="material-icons">delete</span>
                              </button>
                              <span className="tooltip">Cancel</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {loading ? (
              <div className="flex justify-center py-4">
                <CircularProgress />
              </div>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : scheduledTransfers.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No scheduled transfers found
              </div>
            ) : (
              scheduledTransfers.map(transfer => {
                const fromAccount = accounts.find(a => a.id === transfer.from_account_id);
                const toBeneficiary = beneficiaries.find(b => b.id === transfer.to_beneficiary_id);
                return (
                  <div key={transfer.id} className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Next Run</p>
                        <p className="font-semibold text-gray-800">{transfer.next_run_date}</p>
                      </div>
                      <span className={`status-pill status-${transfer.status} flex items-center`}>
                        <span className={`material-icons text-sm mr-1 ${
                          transfer.status === 'active' ? 'text-green-500' : 'text-yellow-500'
                        }`}>fiber_manual_record</span>
                        {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="text-gray-700">
                        {fromAccount ? `${fromAccount.account_type} ••••${fromAccount.account_number.slice(-4)}` : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="text-gray-700">
                        {toBeneficiary ? `${toBeneficiary.name} - ••••${toBeneficiary.account_number.slice(-4)}` : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Frequency</p>
                      <p className="text-gray-700 flex items-center">
                        <span className="material-icons text-gray-400 mr-2">calendar_today</span>
                        {transfer.frequency.charAt(0).toUpperCase() + transfer.frequency.slice(1)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                      <div className="font-bold text-xl text-orange-500">{formatCurrency(transfer.amount)}</div>
                      <div className="flex items-center space-x-2">
                        <div className="action-icon">
                          <button
                            onClick={() => handlePauseResume(transfer)}
                            className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            <span className="material-icons">
                              {transfer.status === 'active' ? 'pause' : 'play_arrow'}
                            </span>
                          </button>
                          <span className="tooltip">
                            {transfer.status === 'active' ? 'Pause' : 'Resume'}
                          </span>
                        </div>
                        <div className="action-icon">
                          <button
                            onClick={() => handleEdit(transfer)}
                            className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            <span className="material-icons">edit</span>
                          </button>
                          <span className="tooltip">Edit</span>
                        </div>
                        <div className="action-icon">
                          <button
                            onClick={() => handleDelete(transfer)}
                            className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            <span className="material-icons">delete</span>
                          </button>
                          <span className="tooltip">Cancel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTransfer ? "Edit Scheduled Transfer" : "New Scheduled Transfer"}</DialogTitle>
        <form onSubmit={handleCreateTransfer}>
          <DialogContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Account</label>
              <select
                name="fromAccount"
                value={formData.fromAccount}
                onChange={handleFormChange}
                className={`w-full rounded-lg ${formErrors.fromAccount ? 'border-red-500' : ''}`}
              >
                <option value="">Select account</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.account_type} **** {account.account_number.slice(-4)} — {formatCurrency(account.balance)}
                  </option>
                ))}
              </select>
              {formErrors.fromAccount && (
                <p className="mt-1 text-sm text-red-600">{formErrors.fromAccount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select
                name="beneficiary"
                value={formData.beneficiary}
                onChange={handleFormChange}
                className={`w-full rounded-lg ${formErrors.beneficiary ? 'border-red-500' : ''}`}
              >
                <option value="">Select beneficiary</option>
                {beneficiaries.map(ben => (
                  <option key={ben.id} value={ben.id}>
                    {ben.name} - **** {ben.account_number.slice(-4)}
                  </option>
                ))}
              </select>
              {formErrors.beneficiary && (
                <p className="mt-1 text-sm text-red-600">{formErrors.beneficiary}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
                onBlur={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setFormData(prev => ({ ...prev, amount: value.toFixed(2) }));
                  }
                }}
                step="0.01"
                min="0"
                className={`w-full rounded-lg ${formErrors.amount ? 'border-red-500' : ''}`}
                placeholder="0.00"
              />
              {formErrors.amount && (
                <p className="mt-1 text-sm text-red-600">{formErrors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleFormChange}
                className={`w-full rounded-lg ${formErrors.frequency ? 'border-red-500' : ''}`}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              {formErrors.frequency && (
                <p className="mt-1 text-sm text-red-600">{formErrors.frequency}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Next Run Date</label>
              <input
                type="date"
                name="nextRunDate"
                value={formData.nextRunDate}
                onChange={handleFormChange}
                className={`w-full rounded-lg ${formErrors.nextRunDate ? 'border-red-500' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {formErrors.nextRunDate && (
                <p className="mt-1 text-sm text-red-600">{formErrors.nextRunDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className={`w-full rounded-lg ${formErrors.description ? 'border-red-500' : ''}`}
                placeholder="Monthly savings transfer"
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {editingTransfer ? "Save Changes" : "Create Transfer"}
            </button>
          </DialogActions>
        </form>
      </Dialog>

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
