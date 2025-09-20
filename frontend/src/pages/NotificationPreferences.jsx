import React, { useEffect, useState } from "react";
import "../NotificationPreferences.css"; // import CSS
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState({
    email_enabled: true,
    sms_enabled: false,
    in_app_enabled: true,
    transactions_enabled: true,
    low_balance_enabled: true,
    security_enabled: true,
    low_balance_threshold: 100.00
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load preferences
  useEffect(() => {
    const token = getAuthToken();
    api.notificationPrefs.get(token)
      .then(data => {
        setPrefs(data);
      })
      .catch(err => {
        console.error("Failed to load preferences:", err);
        setError(err.message);
      });
  }, []);

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const token = getAuthToken();
      await api.notificationPrefs.update(prefs, token);
      setSaving(false);
    } catch (err) {
      console.error("Failed to save preferences:", err);
      setError(err.message);
      setSaving(false);
    }
  };

  useEffect(() => {
    const toggles = document.querySelectorAll(".toggle-checkbox");
    toggles.forEach((toggle) => {
      const label = toggle.nextElementSibling;
      // Initial state
      if (toggle.checked) {
        label.style.backgroundImage = "linear-gradient(to right, #001BB7, #0046FF)";
      } else {
        label.style.backgroundColor = "#E5E7EB";
      }
      toggle.addEventListener("change", function () {
        if (this.checked) {
          label.style.backgroundImage = "linear-gradient(to right, #001BB7, #0046FF)";
          label.style.backgroundColor = "";
        } else {
          label.style.backgroundImage = "";
          label.style.backgroundColor = "#E5E7EB";
        }
      });
    });
  }, []);

  return (
    <div className="antialiased min-h-screen">
      {/* <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start items-center h-16">
            <span className="text-xl font-bold text-gray-800">DigitalSecure</span>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#001BB7] to-[#0046FF]"></div>
      </header> */}

      <main className="py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Notification preferences
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-8">
            {/* Channels */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                Channels
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {["Email", "SMS", "In-app"].map((ch) => (
                  <div key={ch} className="flex items-center justify-between">
                    <span className="text-base text-gray-700">{ch}</span>
                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        className="toggle-checkbox absolute w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        checked={prefs[`${ch.toLowerCase().replace(" ", "_")}_enabled`]}
                        onChange={(e) => setPrefs(p => ({ ...p, [`${ch.toLowerCase().replace(" ", "_")}_enabled`]: e.target.checked }))}
                        id={`${ch.toLowerCase()}-toggle`}
                      />
                      <label
                        htmlFor={`${ch.toLowerCase()}-toggle`}
                        className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Types */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                Alert types
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {["Transactions", "Low balance", "Security"].map((ch) => (
                  <div key={ch} className="flex items-center justify-between">
                    <span className="text-base text-gray-700">{ch}</span>
                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        className="toggle-checkbox absolute w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        defaultChecked
                        id={`${ch.toLowerCase().replace(" ", "")}-toggle`}
                      />
                      <label
                        htmlFor={`${ch.toLowerCase().replace(" ", "")}-toggle`}
                        className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
                      ></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Balance Threshold */}
            <div>
              <div className="flex items-center justify-between flex-wrap">
                <label
                  htmlFor="low-balance-threshold"
                  className="text-base text-gray-700 mb-2 sm:mb-0"
                >
                  Low balance threshold
                </label>
                <div className="relative mt-2 sm:mt-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                                        <input
                        type="text"
                        id="low-balance-threshold"
                        value={prefs.low_balance_threshold}
                        onChange={(e) => setPrefs(p => ({ ...p, low_balance_threshold: parseFloat(e.target.value) || 0 }))}
                        className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0046FF] hover:shadow-md transition-shadow sm:text-sm sm:leading-6"
                      />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="material-icons text-orange-500 text-base mr-1">
                  warning_amber
                </span>
                <p className="text-xs text-orange-500">
                  Alerts are disabled if threshold is $0.
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="border-t border-gray-200 pt-6 flex justify-end">
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-[#001BB7] to-[#0046FF] px-8 py-3 text-base font-medium text-white shadow-sm hover:from-[#0018a3] hover:to-[#003fe0] focus:outline-none focus:ring-2 focus:ring-[#0046FF] focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
