import React from "react";
import { useNavigate } from "react-router-dom";

const FaqPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Roboto',sans-serif]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Help Center</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>

          {/* Search Bar and Ask Bot */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-grow w-full">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search FAQs: debit card, net banking, limits..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              />
            </div>

            {/* Ask Bot Button */}
            <button
              onClick={() => navigate("/chatbot")}
              className="gradient-button text-white font-bold py-3 px-8 rounded-full w-full md:w-auto hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{
                backgroundImage: "linear-gradient(to right, #001BB7, #0046FF)",
              }}
            >
              Ask bot
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Debit cards",
                "Net banking",
                "Transfers",
                "KYC & limits",
                "Loans",
              ].map((category, index) => (
                <button
                  key={index}
                  className={`category-chip py-2 px-5 rounded-full border transition-all duration-300 ${
                    category === "Net banking"
                      ? "bg-blue-100 border-blue-300 text-blue-800"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Info Banner */}
          <div className="p-4 mb-6 bg-orange-100 border-l-4 border-orange-400 rounded-r-lg">
            <div className="flex">
              <div className="py-1">
                <span className="material-icons text-orange-500">info</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-orange-700">
                  We are experiencing a temporary issue with fund transfers. Our
                  team is working on a fix.{" "}
                  <a className="font-bold underline" href="#">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Top Results */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Top Results
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: "credit_card",
                  title: "How do I reset my debit card PIN?",
                  desc: (
                    <>
                      Go to{" "}
                      <a className="text-blue-600 hover:underline" href="#">
                        Cards
                      </a>{" "}
                      → Select card → Reset PIN. You'll receive an OTP.
                    </>
                  ),
                },
                {
                  icon: "trending_up",
                  title: "How can I increase my daily transfer limit?",
                  desc: (
                    <>
                      Open{" "}
                      <a className="text-blue-600 hover:underline" href="#">
                        Limits page
                      </a>{" "}
                      → Request increase. Approval within 1-2 days.
                    </>
                  ),
                },
                {
                  icon: "account_balance",
                  title: "How do I enable net banking?",
                  desc: (
                    <>
                      From{" "}
                      <a className="text-blue-600 hover:underline" href="#">
                        Profile
                      </a>{" "}
                      → Security → Enable net banking and set credentials.
                    </>
                  ),
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="faq-card p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <span className="material-icons text-blue-600 mt-1">
                      {faq.icon}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {faq.title}
                      </h4>
                      <p className="text-gray-600">{faq.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FaqPage;
