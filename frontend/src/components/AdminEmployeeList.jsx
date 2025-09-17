import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { getAuthToken } from '../lib/authHelpers';

export default function AdminEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    role: '',
  });

  const employeeApi = api.admin.employees;

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const data = await employeeApi.list(token);
      setEmployees(data.items || []);
    } catch (err) {
      console.error('Failed to load employees:', err);
      setError('Failed to load employees. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    
    try {
      if (editingEmployee) {
        await employeeApi.update(editingEmployee.id, formData, token);
      } else {
        await employeeApi.create(formData, token);
      }
      
      await loadEmployees();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save employee:', err);
      setError('Failed to save employee. Please try again.');
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this employee?')) {
      return;
    }

    try {
      const token = getAuthToken();
      await employeeApi.remove(id, token);
      await loadEmployees();
    } catch (err) {
      console.error('Failed to remove employee:', err);
      setError('Failed to remove employee. Please try again.');
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      branch: employee.branch,
      role: employee.role,
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      branch: '',
      role: '',
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
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Employees</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Add
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
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Name</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Email</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Branch</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Role</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 px-4 text-gray-900 font-medium">{employee.name}</td>
                <td className="py-4 px-4 text-gray-600">{employee.email}</td>
                <td className="py-4 px-4 text-gray-600">{employee.branch}</td>
                <td className="py-4 px-4 text-gray-600">{employee.role}</td>
                <td className="py-4 px-4 text-sm">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-gray-600 hover:text-[#0046FF] hover:underline"
                  >
                    Edit
                  </button>
                  <span className="text-gray-300 mx-1">•</span>
                  <button
                    onClick={() => handleRemove(employee.id)}
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
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingEmployee ? 'Edit Employee' : 'Add Employee'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select role...</option>
                      <option value="Manager">Manager</option>
                      <option value="Teller">Teller</option>
                      <option value="Advisor">Advisor</option>
                    </select>
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
                    {editingEmployee ? 'Update' : 'Add'}
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