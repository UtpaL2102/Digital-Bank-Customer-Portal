import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TwoFactorSetup() {
  const [method, setMethod] = useState("email");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    console.log(`Send OTP to ${method}`);
    navigate("/two-factor"); // Redirect to OTP verification page
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-10 py-4">
        <div className="flex items-center gap-3 text-slate-800">
          <span className="material-symbols-outlined text-3xl text-blue-600">
            shield
          </span>
          <h2 className="text-slate-900 text-xl font-bold tracking-tight">
            DigitalSecure
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Enable Two-Factor Authentication
            </h1>
            <p className="mt-2 text-slate-600">
              For extra security, we’ll send a 6-digit verification code to your
              registered email or phone number.
            </p>
          </div>

          {/* Options */}
          <div className="mt-8 space-y-4">
            {/* Email Option */}
            <label
              className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-300 ease-in-out ${
                method === "email"
                  ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                  : "border-slate-200 hover:border-blue-400 hover:shadow-sm"
              }`}
              onClick={() => setMethod("email")}
            >
              <span className="material-symbols-outlined text-2xl text-slate-500">
                mail
              </span>
              <div className="flex-1">
                <p className="font-medium text-slate-800">Send code to Email</p>
                <p className="text-sm text-slate-500">siddhi***@gmail.com</p>
              </div>
              <input
                type="radio"
                name="auth-method"
                checked={method === "email"}
                readOnly
                className="hidden"
              />
            </label>

            {/* Phone Option */}
            <label
              className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-300 ease-in-out ${
                method === "phone"
                  ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]"
                  : "border-slate-200 hover:border-blue-400 hover:shadow-sm"
              }`}
              onClick={() => setMethod("phone")}
            >
              <span className="material-symbols-outlined text-2xl text-slate-500">
                smartphone
              </span>
              <div className="flex-1">
                <p className="font-medium text-slate-800">Send code to Phone</p>
                <p className="text-sm text-slate-500">+91 ****1234</p>
              </div>
              <input
                type="radio"
                name="auth-method"
                checked={method === "phone"}
                readOnly
                className="hidden"
              />
            </label>
          </div>

          {/* Button */}
          <div className="mt-8">
            <button
              onClick={handleSendOtp}
              className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Send OTP
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
