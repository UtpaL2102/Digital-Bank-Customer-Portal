import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { getAuthToken } from '../lib/authHelpers';

/**
 * AdminAuditLogs - Admin dashboard component for displaying and filtering system audit logs
 * 
 * Features:
 * - Displays paginated list of system audit events
 * - Filters by user, action type, and date range
 * - Color-coded status indicators for different event types
 * - Expandable details view for each log entry
 * 
 * Used in: Admin Dashboard (/admin/audit)
 */
export default function AdminAuditLogs() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    user: '',
    action: '',
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }
      
      console.log('Loading audit logs with token:', token ? 'Present' : 'Missing');
      
      // Build query params
      const params = {};
      if (filters.user) params.user = filters.user;
      if (filters.action) params.action = filters.action;
      if (filters.fromDate) params.from = filters.fromDate;
      if (filters.toDate) params.to = filters.toDate;
      
      console.log('Fetching audit logs with params:', params);
      const data = await api.admin.audit.list(params, token);
      console.log('Received audit logs:', data);
      
      if (data && Array.isArray(data.items)) {
        setAuditLogs(data.items);
      } else if (data && Array.isArray(data)) {
        setAuditLogs(data);
      } else if (data && typeof data === 'object') {
        // Handle case where data might be in a different structure
        const items = data.audit_logs || data.logs || data.records || [];
        setAuditLogs(items);
        if (items.length === 0) {
          console.warn('No audit logs found in response:', data);
        }
      } else {
        console.warn('Unexpected audit logs response format:', data);
        setAuditLogs([]);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
      setError(`Failed to load audit logs: ${err.message || 'Please try again later.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadAuditLogs();
  };

  const resetFilters = () => {
    setFilters({
      user: '',
      action: '',
      fromDate: '',
      toDate: '',
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'SUCCESS':
      case 'OK':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'ERROR':
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action) => {
    if (action.includes('KYC')) return 'bg-purple-100 text-purple-800';
    if (action.includes('LOGIN')) return 'bg-blue-100 text-blue-800';
    if (action.includes('TRANSFER')) return 'bg-green-100 text-green-800';
    if (action.includes('ACCOUNT')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Audit Logs</h2>
        
        {/* Filters */}
        <form onSubmit={handleFilterSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
              <input
                type="text"
                value={filters.user}
                onChange={(e) => handleFilterChange('user', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search by user..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
              <input
                type="text"
                value={filters.action}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Filter by action..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => handleFilterChange('toDate', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white rounded-md hover:shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0046FF]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-medium text-gray-500 text-sm">Time</th>
                <th className="py-3 px-4 font-medium text-gray-500 text-sm">User</th>
                <th className="py-3 px-4 font-medium text-gray-500 text-sm">Action</th>
                <th className="py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
                <th className="py-3 px-4 font-medium text-gray-500 text-sm">Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                auditLogs.map((log, index) => (
                  <tr key={log.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-900 font-medium">
                      {log.user_id || log.username || '-'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {log.details ? (
                        <details className="cursor-pointer">
                          <summary className="text-blue-600 hover:text-blue-800">
                            View details
                          </summary>
                          <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                            {typeof log.details === 'string'
                              ? log.details
                              : JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}