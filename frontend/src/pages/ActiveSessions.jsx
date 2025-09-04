import React from "react";

export default function ActiveSessions() {
  const sessions = [
    {
      device: "Chrome on Windows",
      ip: "203.0.113.45",
      location: "Delhi, IN",
      lastActive: "2 min ago",
      expiry: "2025-09-10",
    },
    {
      device: "Safari on iPhone",
      ip: "198.51.100.12",
      location: "Mumbai, IN",
      lastActive: "Yesterday",
      expiry: "2025-09-01",
    },
  ];

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
            <h3 className="text-xl font-bold text-gray-900 mb-4">Active Sessions</h3>
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
                  {sessions.map((session, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{session.device}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{session.ip}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{session.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{session.lastActive}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{session.expiry}</td>
                      <td className="px-4 py-3 text-right text-sm">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => alert("Session revoked")}
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => alert("All sessions revoked")}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Revoke All
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

