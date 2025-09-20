import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function ActiveSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sessionToRevoke, setSessionToRevoke] = useState(null);
  const navigate = useNavigate();
  
  const loadSessions = async () => {
    try {
      setLoading(true);
      setError("");
      const token = getAuthToken();
      const response = await api.auth.sessions.list(token);
      setSessions(response.sessions || []);
    } catch (err) {
      console.error('Failed to load sessions:', err);
      setError(err.message || 'Failed to load active sessions');
      if (err.message?.includes('unauthorized')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [navigate]);

  const handleRevoke = async (sessionId) => {
    try {
      setError("");
      setShowConfirmModal(false);
      setSessionToRevoke(null);
      setLoading(true);
      
      const token = getAuthToken();
      await api.auth.sessions.revoke(sessionId, token);
      await loadSessions();
    } catch (err) {
      console.error('Failed to revoke session:', err);
      setError(err.message || 'Failed to revoke session');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAll = async () => {
    try {
      setError("");
      setShowConfirmModal(false);
      setLoading(true);
      
      const token = getAuthToken();
      await api.auth.sessions.revokeAll(token);
      await loadSessions();
    } catch (err) {
      console.error('Failed to revoke all sessions:', err);
      setError(err.message || 'Failed to revoke all sessions');
    } finally {
      setLoading(false);
    }
  };

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // difference in seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const formatExpiryDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-gray-900">DigitalSecure</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Active Sessions</h3>
              <button
                onClick={() => loadSessions()}
                disabled={loading}
                className="text-[#0046FF] hover:text-[#001BB7] disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0046FF]"></div>
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No active sessions found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Device</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">IP</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Last Active</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Token Expires</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sessions.map((session) => (
                      <tr key={session.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          <div className="text-gray-900 font-medium">{session.device}</div>
                          {session.current && (
                            <div className="text-xs text-green-600 font-medium mt-1">Current Session</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-500">{session.ip}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{session.location}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{formatLastActive(session.last_active)}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{formatExpiryDate(session.expires_at)}</td>
                        <td className="px-4 py-3 text-right text-sm">
                          {!session.current && (
                            <button
                              className="text-red-600 hover:text-red-800 disabled:opacity-50"
                              onClick={() => {
                                setSessionToRevoke(session);
                                setShowConfirmModal(true);
                              }}
                              disabled={loading}
                            >
                              Revoke
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setSessionToRevoke(null);
                      setShowConfirmModal(true);
                    }}
                    disabled={loading}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
                  >
                    Revoke All Other Sessions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {sessionToRevoke ? 'Revoke Session?' : 'Revoke All Other Sessions?'}
            </h4>
            <p className="text-gray-600 mb-6">
              {sessionToRevoke
                ? 'Are you sure you want to revoke this session? The user will be signed out immediately.'
                : 'Are you sure you want to revoke all other sessions? All other devices will be signed out immediately.'}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (sessionToRevoke) {
                    handleRevoke(sessionToRevoke.id);
                  } else {
                    handleRevokeAll();
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Revoke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

