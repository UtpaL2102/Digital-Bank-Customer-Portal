import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChatbotSupportPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg flex flex-col h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Help & Chatbot</h1>
            <p className="text-sm text-gray-500 mt-1">
              Ask about debit cards, net banking, transfers, etc.
            </p>
          </div>
          <button
            onClick={() => navigate("/chat-history")}
            className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white px-3 py-2 rounded-full text-sm font-medium shadow hover:shadow-lg transition"
          >
            View History
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Bot message */}
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-lg p-4 max-w-xs shadow-sm">
              <p className="text-gray-800 text-sm">Hi! How can I help today?</p>
              <p className="text-xs text-gray-400 mt-2">Bot • 2:14 PM</p>
            </div>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white rounded-2xl rounded-br-lg p-4 max-w-xs shadow-md">
              <p className="text-sm">How to increase daily limit?</p>
              <p className="text-xs text-gray-200 mt-2 text-right">
                You • 2:15 PM
              </p>
            </div>
          </div>

          {/* Bot response */}
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-lg p-4 max-w-xs shadow-sm">
              <p className="text-gray-800 text-sm">
                Go to Limits → Request Increase. We'll review in 1-2 days.
              </p>
              <p className="text-xs text-gray-400 mt-2">Confidence: 0.92</p>
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-full hover:shadow-md transition-shadow duration-300">
                Reset debit PIN
              </button>
              <button className="bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-full hover:shadow-md transition-shadow duration-300">
                Net banking activation
              </button>
              <button className="bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-full hover:shadow-md transition-shadow duration-300">
                Low balance alerts
              </button>
            </div>
          </div>
        </div>

        {/* Footer Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h2 className="font-semibold text-gray-800">
              Escalate to human support
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              We'll log your chats to chatbot_logs
            </p>
          </div>
          <div className="mt-4 flex items-center bg-gray-100 rounded-full p-2">
            <input
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none px-4 py-2"
              placeholder="Type your message..."
              type="text"
            />
            <button className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

