import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../TwoFactor.css";

export default function TwoFactor() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode !== "123456") {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
      setSuccess(true);

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/minimal-dashboard");
      }, 1500); // 1.5s delay for toast visibility
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen relative">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900">DigitalSecure</h1>
        </div>
      </header>

      {/* Toast Notification */}
      {success && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 animate-fade-in">
          <span className="material-icons text-green-600">check_circle</span>
          <span className="text-sm font-medium">Verification successful!</span>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md space-y-6">
            {/* Title */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-3">
                <span className="material-icons text-gray-400 text-3xl">
                  shield
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Two-factor verification
                </h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Enter the 6-digit code
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center bg-orange-100 border border-orange-300 text-orange-700 px-4 py-3 rounded-lg">
                <span className="material-icons text-[#FF8040] mr-2">
                  error_outline
                </span>
                <span className="text-sm">Invalid code. Please try again.</span>
              </div>
            )}

            {/* OTP Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-center gap-2 sm:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className={`otp-input w-12 h-16 sm:w-14 sm:h-20 text-center text-3xl sm:text-4xl font-bold text-gray-900 bg-gray-50 border-2 ${
                      error ? "border-orange-400" : "border-gray-200"
                    } rounded-2xl transition-all duration-200`}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-full text-white bg-gradient-to-r from-[#001BB7] to-[#0046FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-shadow duration-300"
              >
                Verify
              </button>
            </form>

            {/* Help Link */}
            <div className="text-center text-sm">
              <p className="text-gray-500">
                Having trouble?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Use a backup code
                </a>
              </p>
            </div>

            {/* Checkbox */}
            <div className="flex items-center justify-center">
              <input
                id="remember-device"
                name="remember-device"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-device"
                className="ml-2 block text-sm text-gray-600"
              >
                We'll remember this device for 30 days.
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
