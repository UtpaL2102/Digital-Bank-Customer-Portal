import React from "react";

export default function ChatHistoryPage() {
  const chatData = [
    {
      date: "2025-08-10 14:12",
      question: "Increase daily limit?",
      answer: "Go to Limits → Request Increase...",
      confidence: 0.92,
      reference: "KYC-2025-142",
    },
    {
      date: "2025-08-09 10:05",
      question: "Reset debit PIN",
      answer: "Open Cards → Reset PIN...",
      confidence: 0.95,
      reference: "FAQ-34",
    },
    {
      date: "2025-08-08 18:30",
      question: "Dispute a transaction",
      answer: "I can't process that request...",
      confidence: 0.45,
      reference: "ESC-2025-09",
      highlight: true,
    },
    {
      date: "2025-08-07 11:21",
      question: "How to get a new card?",
      answer: "Go to Cards → Order new card...",
      confidence: 0.98,
      reference: "FAQ-12",
    },
    {
      date: "2025-08-06 09:00",
      question: "Check account balance",
      answer: "Your current balance is...",
      confidence: 0.99,
      reference: "API-Balance",
    },
  ];

  const getConfidenceColor = (value) => {
    if (value < 0.6) return "low";
    if (value < 0.8) return "medium";
    return "high";
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chat history</h1>
      </header>

      {/* Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <div className="flex-grow mb-4 md:mb-0">
            <input
              placeholder="Search question"
              type="text"
              className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <input
              placeholder="Confidence ≥ 0.8"
              type="text"
              className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="flex-shrink-0">
            <input
              placeholder="Date: Last 30 days"
              type="text"
              className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-700 font-semibold text-sm border-b border-gray-200">
                <th className="p-4">Date</th>
                <th className="p-4">Question</th>
                <th className="p-4">Answer (snippet)</th>
                <th className="p-4">Confidence</th>
                <th className="p-4">Reference</th>
              </tr>
            </thead>
            <tbody>
              {chatData.map((chat, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    chat.highlight ? "bg-orange-50" : ""
                  }`}
                >
                  <td className="p-4 text-sm text-gray-500">{chat.date}</td>
                  <td className="p-4 font-semibold text-gray-800">
                    {chat.question}
                  </td>
                  <td className="p-4 text-gray-600">{chat.answer}</td>
                  <td className="p-4 flex items-center text-sm">
                    <span
                      className={`h-2 w-2 rounded-full mr-2 ${
                        getConfidenceColor(chat.confidence) === "low"
                          ? "bg-orange-500"
                          : getConfidenceColor(chat.confidence) === "medium"
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                    ></span>
                    <span
                      className={`${
                        getConfidenceColor(chat.confidence) === "low"
                          ? "text-orange-500 font-semibold"
                          : "text-green-600"
                      }`}
                    >
                      {chat.confidence.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">{chat.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-px transition duration-300">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
