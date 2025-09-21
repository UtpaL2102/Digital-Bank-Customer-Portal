import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [markingRead, setMarkingRead] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Calculate unread count from notifications
  const calculateUnreadCount = useCallback((notificationsList) => {
    return notificationsList.filter(n => !n.read).length;
  }, []);

  // Load notifications and calculate unread count
  const loadNotifications = useCallback(async (isActive = true) => {
    if (!isActive) return;
    
    try {
      setLoading(true);
      setError("");
      
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.notifications.listNotifications(token);
      if (!isActive) return;

      const notificationsList = response?.items || [];
      setNotifications(notificationsList);
      
      // Calculate unread count from notifications list
      const unreadCount = notificationsList.filter(n => !n.read).length;
      setUnreadCount(unreadCount);
      
      setError("");
    } catch (err) {
      console.error("Failed to load notifications:", err);
      if (isActive) {
        setError("Failed to load notifications. Please try again.");
      }
    } finally {
      if (isActive) {
        setLoading(false);
      }
    }
  }, [calculateUnreadCount]);

  useEffect(() => {
    let isActive = true;
    loadNotifications(isActive);
    return () => { isActive = false; };
  }, [loadNotifications]);

  const handleMarkRead = async (notificationId) => {
    if (markingRead === notificationId) return;

    try {
      setMarkingRead(notificationId);
      const token = getAuthToken();
      await api.notifications.markNotificationRead(notificationId, token);
      
      // Optimistic local update
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
      setError("");

      // Reconcile with server
      const unreadResp = await api.notifications.getUnreadCount(token);
      const serverCount = unreadResp.count ?? unreadResp.unreadCount;
      if (Number.isInteger(serverCount)) {
        setUnreadCount(serverCount);
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setError("Failed to mark notification as read. Please try again.");
    } finally {
      setMarkingRead(null);
    }
  };

  const handleMarkAllRead = async () => {
    if (unreadCount === 0 || markingAllRead) return;

    try {
      setMarkingAllRead(true);
      const token = getAuthToken();
      await api.notifications.markAllRead(token);
      
      // Optimistic local update
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      setError("");
      setShowConfirmDialog(false);

      // Reconcile with server
      await loadNotifications();
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setError("Failed to mark all notifications as read. Please try again.");
    } finally {
      setMarkingAllRead(false);
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "alert":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-900">Digital Bank</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Notifications {unreadCount > 0 && (
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    ({unreadCount} unread)
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <button
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={markingAllRead}
                  aria-label="Mark all notifications as read"
                >
                  {markingAllRead ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Marking all read...
                    </>
                  ) : "Mark all as read"}
                </button>
              )}
              <button
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-[#001BB7] to-[#0046FF] px-8 py-3 text-base font-medium text-white shadow-sm hover:from-[#0018a3] hover:to-[#003fe0] focus:outline-none focus:ring-2 focus:ring-[#0046FF] focus:ring-offset-2 transition-all transform hover:scale-105"
                onClick={() => navigate("/notifications/preferences")}
                aria-label="Go to notification preferences"
              >
                Preferences
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex items-center">
                  <p className="text-sm text-red-600">{error}</p>
                  <button
                    className="ml-4 inline-flex rounded-md px-3 py-1.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => { setError(''); setLoading(true); loadNotifications(); }}
                  >
                    Retry
                  </button>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => setError("")}
                      aria-label="Dismiss error"
                    >
                      <span className="sr-only">Dismiss</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </div>
            ) : notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200" role="list">
                {notifications.map((note) => (
                  <li 
                    key={note.id} 
                    className={`py-4 flex items-start ${!note.read ? 'cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-50' : ''} relative`}
                    onClick={() => !note.read && handleMarkRead(note.id)}
                    onKeyDown={(e) => {
                      if (!note.read && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleMarkRead(note.id);
                      }
                    }}
                    tabIndex={note.read ? -1 : 0}
                    role={!note.read ? 'button' : 'listitem'}
                    aria-label={`${note.title} - ${note.read ? 'Read' : 'Unread'}`}
                  >
                    <div
                      className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 mr-4 ${getBadgeColor(
                        note.type
                      )}`}
                      aria-hidden="true"
                    ></div>
                    <div className={note.read ? 'opacity-60' : ''}>
                      <p className="text-sm font-medium text-gray-900">
                        {note.title}
                        {!note.read && markingRead === note.id && (
                          <span className="ml-2 text-xs text-blue-600">Marking as read...</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">{note.message}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(note.created_at).toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Mark all as read?
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to mark all notifications as read? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={handleMarkAllRead}
                  disabled={markingAllRead}
                >
                  {markingAllRead ? "Processing..." : "Confirm"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={markingAllRead}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
