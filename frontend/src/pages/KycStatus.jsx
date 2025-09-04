// src/pages/KycStatus.jsx
import React from "react";

export default function KycStatus() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen w-full p-4 md:p-8 font-inter">
      {/* Header */}
      <header className="pb-4 border-b border-gray-200">
        <h1 className="text-sm font-medium text-gray-600">DigitalSecure</h1>
      </header>

      {/* Main Section */}
      <main className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">KYC Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Timeline Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 md:p-8 relative">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Verification Timeline
            </h3>

            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-3 top-3 bottom-3 w-[2px] bg-gray-200 z-0"></div>

              <ul className="space-y-8 relative z-10">
                {/* Application Submitted */}
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-4">
                    <span className="material-icons text-white text-base">check</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Application Submitted</p>
                    <p className="text-sm text-gray-500">
                      We've received your KYC documents.
                    </p>
                  </div>
                </li>

                {/* Documents Verified */}
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-4">
                    <span className="material-icons text-white text-base">check</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Documents Verified</p>
                    <p className="text-sm text-gray-500">
                      Your identity documents have been successfully verified.
                    </p>
                  </div>
                </li>

                {/* Selfie Verification Failed */}
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-4">
                    <span className="material-icons text-white text-base">close</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Selfie Verification</p>
                    <div className="mt-1 bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-full inline-block">
                      Selfie mismatch — please resubmit
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Resubmit Button */}
            <div className="mt-10">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                Resubmit KYC
              </button>
            </div>
          </div>

          {/* Current Result Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Current Result
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Verification ID</p>
                <p className="font-medium text-gray-800">KYC-2025-000142</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-600">Score</p>
                <p className="text-2xl font-bold text-red-700">0.70</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-600">Reason</p>
                <p className="font-semibold text-red-800">
                  Face not clearly visible.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Timestamp</p>
                <p className="font-medium text-gray-800">Today 10:02 AM</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Resubmit Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <button className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          Resubmit KYC
        </button>
      </div>
    </div>
  );
}
