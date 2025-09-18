import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { getAuthToken } from '../lib/authHelpers';

export default function AdminLimitRequests() {
  const [limitRequests, setLimitRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approve' or 'decline'
  const [note, setNote] = useState('');

  useEffect(() => {
    loadLimitRequests();
  }, []);

  const loadLimitRequests = async () => {
    try {
      setLoading(true);
      const token = getAuthToken('admin'); // Specify 'admin' token type
      if (!token) {
        throw new Error('No admin authentication token found');
      }
      const data = await api.admin.limitRequests.list(token);
      setLimitRequests(data.limit_requests || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load limit requests:', err);
      setError(err.message || 'Failed to load limit requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setActionType('approve');
    setNote('');
    setShowConfirmModal(true);
  };

  const handleDecline = (request) => {
    setSelectedRequest(request);
    setActionType('decline');
    setNote('');
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    try {
      setLoading(true);
      const token = getAuthToken('admin'); // Specify 'admin' token type
      
      if (!token) {
        throw new Error('No admin authentication token found');
      }

      if (actionType === 'approve') {
        await api.admin.limitRequests.approve(selectedRequest.id, { note }, token);
      } else {
        await api.admin.limitRequests.decline(selectedRequest.id, { note }, token);
      }
      
      await loadLimitRequests();
      handleCloseModal();
      setError(null);
    } catch (err) {
      console.error(`Failed to ${actionType} limit request:`, err);
      setError(err.message || `Failed to ${actionType} limit request. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedRequest(null);
    setActionType(null);
    setNote('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading && !limitRequests.length) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0046FF]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Limit Requests</h2>
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
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">User ID</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Current Daily/Monthly</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Requested Daily/Monthly</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Reason</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm">Date</th>
              <th className="py-3 px-4 font-medium text-gray-500 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {limitRequests.map((request, index) => (
              <tr key={request.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 px-4 text-gray-900 font-medium">{request.user_id}</td>
                <td className="py-4 px-4">
                  <div className="text-gray-600">Daily: {formatAmount(request.current_daily_limit || 0)}</div>
                  <div className="text-gray-600">Monthly: {formatAmount(request.current_monthly_limit || 0)}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-900">Daily: {formatAmount(request.requested_daily_limit || 0)}</div>
                  <div className="text-gray-900">Monthly: {formatAmount(request.requested_monthly_limit || 0)}</div>
                </td>
                <td className="py-4 px-4 text-gray-600">{request.reason}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'declined' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div>Requested: {formatDate(request.created_at)}</div>
                  {request.decided_at && (
                    <div className="text-gray-500">
                      Reviewed: {formatDate(request.decided_at)}
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-right">
                  {request.status === 'pending' ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleApprove(request)}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 transition-colors"
                      >
                        Review & Approve
                      </button>
                      <button
                        onClick={() => handleDecline(request)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      {request.decision_note || 'No note provided'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {actionType === 'approve' ? 'Approve' : 'Decline'} Limit Request
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to {actionType} this limit request from{' '}
                <span className="font-medium">{selectedRequest.customerName}</span>?
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add a note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter your note here..."
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-white ${
                    actionType === 'approve'
                      ? 'bg-gradient-to-r from-green-600 to-green-500'
                      : 'bg-gradient-to-r from-red-600 to-red-500'
                  } hover:shadow-lg`}
                >
                  {loading ? 'Processing...' : actionType === 'approve' ? 'Approve' : 'Decline'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}