import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function NotificationPreferencesPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    push_notifications: true,
    transaction_alerts: true,
    security_alerts: true,
    marketing_notifications: false,
    news_updates: false
  });

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const token = getAuthToken();
        const response = await api.notificationPrefs.get(token);
        if (response) {
          setPreferences(response);
        }
        setError("");
      } catch (err) {
        console.error("Failed to load notification preferences:", err);
        setError("Failed to load preferences. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);
      const token = getAuthToken();
      await api.notificationPrefs.update(preferences, token);
      setError("");
      // Navigate back to notifications page after successful save
      navigate("/notifications");
    } catch (err) {
      console.error("Failed to save notification preferences:", err);
      setError("Failed to save preferences. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex justify-center items-center">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">Digital Bank</h1>
            <button
              onClick={() => navigate("/notifications")}
              className="text-blue-600 hover:text-blue-700"
              aria-label="Back to notifications"
            >
              Back to Notifications
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Notification Preferences</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose which notifications you'd like to receive and how you'd like to receive them.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {getPreferenceDescription(key)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(key)}
                    className={`
                      relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full 
                      transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-blue-500 ${value ? 'bg-blue-600' : 'bg-gray-200'}
                    `}
                    role="switch"
                    aria-checked={value}
                  >
                    <span
                      className={`
                        pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform 
                        ring-0 transition ease-in-out duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => navigate("/notifications")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Saving...
                  </>
                ) : "Save Changes"
                }
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getPreferenceDescription(key) {
  const descriptions = {
    email_notifications: "Receive notifications via email",
    push_notifications: "Receive push notifications in your browser",
    transaction_alerts: "Get alerts for account transactions",
    security_alerts: "Get alerts for security-related events",
    marketing_notifications: "Receive updates about new features and offers",
    news_updates: "Receive news and updates about our services"
  };
  return descriptions[key] || "Configure this notification setting";
}