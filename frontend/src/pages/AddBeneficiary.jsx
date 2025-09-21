import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function AddBeneficiary() {
  const navigate = useNavigate();
  
  // State management
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    account_number: "",
    bank_name: "",
    ifsc_swift: "",
    currency: "INR"
  });

  // Loading states for operations
  const [deleting, setDeleting] = useState(false);

  // Validation state
  const [formErrors, setFormErrors] = useState({});

  // Fetch beneficiaries on component mount
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.beneficiaries.listBeneficiaries(token);
        setBeneficiaries(response.beneficiaries || []);
      } catch (err) {
        setError(err.message || "Failed to fetch beneficiaries");
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, [navigate]);

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.account_number.trim()) errors.account_number = "Account number is required";
    if (!/^\d{8,20}$/.test(form.account_number.trim())) {
      errors.account_number = "Invalid account number format";
    }
    if (!form.bank_name.trim()) errors.bank_name = "Bank name is required";
    if (!form.ifsc_swift.trim()) errors.ifsc_swift = "IFSC/SWIFT code is required";

    const ifscSwiftValue = form.ifsc_swift.trim().toUpperCase();
    if (form.currency === "INR") {
      // IFSC validation for Indian banks (11 characters: 4 letters + 7 alphanumeric)
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscSwiftValue)) {
        errors.ifsc_swift = "Invalid IFSC code format (e.g., SBIN0123456)";
      }
    } else {
      // SWIFT/BIC validation (8 or 11 characters: 4 letters + 2 letters/digits + 2 letters/digits + optional 3 characters)
      if (!/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/.test(ifscSwiftValue)) {
        errors.ifsc_swift = "Invalid SWIFT/BIC code format";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: id === 'ifsc_swift' ? value.toUpperCase() : value,
    }));
    // Clear error for the field being changed
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      account_number: "",
      bank_name: "",
      ifsc_swift: "",
      currency: "INR"
    });
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (beneficiary) => {
    setForm({
      name: beneficiary.name,
      account_number: beneficiary.account_number,
      bank_name: beneficiary.bank_name,
      ifsc_swift: beneficiary.ifsc_swift,
      currency: beneficiary.currency || "INR",
      description: beneficiary.description || ""
    });
    setEditingId(beneficiary.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      const token = getAuthToken();
      await api.beneficiaries.deleteBeneficiary(deletingId, token);
      setBeneficiaries(prev => prev.filter(b => b.id !== deletingId));
      setSuccess("Beneficiary deleted successfully");
    } catch (err) {
      setError(err.message || "Failed to delete beneficiary");
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    const token = getAuthToken();

    try {
      if (editingId) {
        const response = await api.beneficiaries.updateBeneficiary(editingId, form, token);
        setBeneficiaries(prev => 
          prev.map(b => b.id === editingId ? response.beneficiary : b)
        );
        setSuccess("Beneficiary updated successfully");
      } else {
        const response = await api.beneficiaries.addBeneficiary(form, token);
        setBeneficiaries(prev => [response.beneficiary, ...prev]);
        setSuccess("Beneficiary added successfully");
      }
      resetForm();
    } catch (err) {
      setError(err.message || "Failed to save beneficiary");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Manage Beneficiaries</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all"
            >
              Add New Beneficiary
            </button>
          )}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
            {success}
          </div>
        )}

        {/* Beneficiaries List */}
        {!showForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {beneficiaries.length === 0 ? (
              <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-md">
                <p className="text-gray-500">No beneficiaries found. Add your first beneficiary.</p>
              </div>
            ) : (
              beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{beneficiary.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(beneficiary)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <span className="material-icons text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(beneficiary.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Account: {beneficiary.account_number ? `••••${String(beneficiary.account_number).slice(-4)}` : 'N/A'}</p>
                    <p>Bank: {beneficiary.bank_name}</p>
                    <p>IFSC/SWIFT: {beneficiary.ifsc_swift}</p>
                    <p>Currency: {beneficiary.currency || "INR"}</p>
                    {beneficiary.description && (
                      <p className="text-gray-500">{beneficiary.description}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {editingId ? "Edit Beneficiary" : "Add Beneficiary"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${
                    formErrors.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="account_number" className="block text-sm font-medium text-gray-700 mb-2">Account number</label>
                <input
                  id="account_number"
                  type="text"
                  value={form.account_number}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${
                    formErrors.account_number ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {formErrors.account_number && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.account_number}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-2">Bank</label>
                  <input
                    id="bank_name"
                    type="text"
                    value={form.bank_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${
                      formErrors.bank_name ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {formErrors.bank_name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.bank_name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="ifsc_swift" className="block text-sm font-medium text-gray-700 mb-2">IFSC/SWIFT</label>
                  <input
                    id="ifsc_swift"
                    type="text"
                    value={form.ifsc_swift}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${
                      formErrors.ifsc_swift ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {formErrors.ifsc_swift && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.ifsc_swift}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  id="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : (editingId ? "Update" : "Save")}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this beneficiary? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
