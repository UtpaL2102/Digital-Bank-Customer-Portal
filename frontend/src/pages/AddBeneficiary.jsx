// src/pages/AddBeneficiary.jsx
import React, { useState } from "react";

export default function AddBeneficiary() {
  const [form, setForm] = useState({
    name: "",
    accountNumber: "",
    bank: "",
    ifsc: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you'd call backend API to save beneficiary
    console.log("Form submitted:", form);
    alert("Beneficiary saved!");
  };

  const handleCancel = () => {
    setForm({
      name: "",
      accountNumber: "",
      bank: "",
      ifsc: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Beneficiary</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">Account number</label>
            <input
              id="accountNumber"
              type="text"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-2">Bank</label>
              <input
                id="bank"
                type="text"
                value={form.bank}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="ifsc" className="block text-sm font-medium text-gray-700 mb-2">IFSC/SWIFT</label>
              <input
                id="ifsc"
                type="text"
                value={form.ifsc}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
            <textarea
              id="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
