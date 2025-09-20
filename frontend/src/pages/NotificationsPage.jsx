import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    api.notifications.listNotifications(token)
      .then(response => {
        setNotifications(response.items || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load notifications:", error);
        setLoading(false);
      });
  }, []);

  const handleMarkRead = async (notificationId) => {
    try {
      const token = getAuthToken();
      await api.notifications.markNotificationRead(notificationId, token);
      // Update local state to mark as read
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Keep the demo notifications as a fallback if API fails
  const demoNotifications = [
    {
      id: 1,
      title: "Transaction Successful",
      message: "₹5,000 transferred to John Doe.",
      time: "2 minutes ago",
      type: "success",
    },
    {
      id: 2,
      title: "Loan EMI Reminder",
      message: "Your EMI of ₹12,000 is due tomorrow.",
      time: "1 hour ago",
      type: "warning",
    },
    {
      id: 3,
      title: "New Login Detected",
      message: "A login from a new device was detected in Delhi, IN.",
      time: "Yesterday",
      type: "alert",
    },
  ];

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
            <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
            <button
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-[#001BB7] to-[#0046FF] px-8 py-3 text-base font-medium text-white shadow-sm hover:from-[#0018a3] hover:to-[#003fe0] focus:outline-none focus:ring-2 focus:ring-[#0046FF] focus:ring-offset-2 transition-all transform hover:scale-105"
              onClick={() => navigate("/notifications")}
            >
              Preferences
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {loading ? (
              <p className="text-gray-600 text-sm text-center">Loading notifications...</p>
            ) : notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {notifications.map((note) => (
                  <li 
                    key={note.id} 
                    className="py-4 flex items-start cursor-pointer hover:bg-gray-50"
                    onClick={() => !note.read && handleMarkRead(note.id)}
                  >
                    <div
                      className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 mr-4 ${getBadgeColor(
                        note.type
                      )}`}
                    ></div>
                    <div className={note.read ? 'opacity-60' : ''}>
                      <p className="text-sm font-medium text-gray-900">
                        {note.title}
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
              <p className="text-gray-600 text-sm text-center">
                No new notifications.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
