import React, { useState } from "react";
import "../forgotPassword.css";
import api from '../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    await api.auth.requestPasswordReset({ email });
    setSuccess(true); // show toast
  } catch (err) {
    setError(err?.error?.message || 'Unable to send reset link');
  }
};

  return (
    <div className="bg-[#F5F7FA] min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900">DigitalSecure</h1>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md space-y-6">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                No worries! Enter your email below and we'll send you a reset
                link.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center bg-orange-100 border border-orange-300 text-orange-700 px-4 py-3 rounded-lg text-sm">
                <span className="material-icons text-[#FF8040] mr-2">
                  error_outline
                </span>
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-100"
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 text-white font-semibold rounded-full bg-gradient-to-r from-[#001BB7] to-[#0046FF] hover:shadow-md transition-shadow"
              >
                Send Reset Link
              </button>
            </form>

            {/* Footer Link */}
            <div className="text-center text-sm">
              <p className="text-gray-500">
                Remembered your password?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Back to login
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      {success && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Password reset link sent successfully!
        </div>
      )}
    </div>
  );
}
