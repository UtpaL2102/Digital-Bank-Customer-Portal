import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { getAuthToken } from '../lib/authHelpers';

export default function AdminBranchList() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    address: ''
  });

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const data = await api.admin.branches.list(token);
      setBranches(data.items || []);
    } catch (err) {
      console.error('Failed to load branches:', err);
      setError('Failed to load branches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    
    try {
      if (editingBranch) {
        await api.admin.branches.update(editingBranch.id, formData, token);
      } else {
        await api.admin.branches.create(formData, token);
      }
      
      await loadBranches();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save branch:', err);
      setError('Failed to save branch. Please try again.');
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this branch?')) {
      return;
    }

    try {
      const token = getAuthToken();
      await api.admin.branches.remove(id, token);
      await loadBranches();
    } catch (err) {
      console.error('Failed to remove branch:', err);
      setError('Failed to remove branch. Please try again.');
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      code: branch.code,
      name: branch.name,
      address: branch.address,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBranch(null);
    setFormData({
      code: '',
      name: '',
      address: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0046FF]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Branches</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Add Branch
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Code</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Name</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Address</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={branch.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 px-4 text-gray-600">{branch.code}</td>
                <td className="py-4 px-4 text-gray-900 font-medium">{branch.name}</td>
                <td className="py-4 px-4 text-gray-600">{branch.address}</td>
                <td className="py-4 px-4 text-sm">
                  <button
                    onClick={() => handleEdit(branch)}
                    className="text-gray-600 hover:text-[#0046FF] hover:underline"
                  >
                    Edit
                  </button>
                  <span className="text-gray-300 mx-1">•</span>
                  <button
                    onClick={() => handleRemove(branch.id)}
                    className="text-gray-600 hover:text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingBranch ? 'Edit Branch' : 'Add Branch'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Branch Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Branch Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows="3"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white rounded-md hover:shadow-lg"
                  >
                    {editingBranch ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}