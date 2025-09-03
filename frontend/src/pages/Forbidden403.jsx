import React from "react";
import { Link } from "react-router-dom";

export default function Forbidden403() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen flex items-center justify-center font-['Inter']">
      <div className="bg-white p-12 rounded-xl shadow-lg text-center max-w-sm w-full">
        {/* Lock Icon */}
        <div className="mb-6 flex justify-center items-center">
          <span className="material-icons text-5xl text-orange-500">lock</span>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-[#1F2937] mb-4">403</h1>

        {/* Message */}
        <p className="text-lg text-[#4B5563] mb-8">
          You don’t have permission to view this page.
        </p>

        {/* Request Access Button */}
        <Link
          to="/request-access"
          className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 inline-block"
        >
          Request Access
        </Link>
      </div>
    </div>
  );
}
