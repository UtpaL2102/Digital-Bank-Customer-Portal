// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);

      const cleanedEmail = (email || "").trim();
      const cleanedPassword = (password || "").trim();

      if (cleanedEmail === "user@gmail.com" && cleanedPassword === "123456") {
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard", { replace: true });
        return;
      }

      setError("Invalid email or password. Please try again.");
    }, 1200);
  };

  return (
    <div className="bg-[#F5F7FA] flex items-center justify-center min-h-screen p-4 font-['Roboto']">
      <div className="bg-white w-full max-w-md p-8 md:p-12 rounded-2xl shadow-lg">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <img
            alt="DigitalSecure Logo"
            className="mx-auto h-8 mb-6"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC7tfyRBddShpOkDdl5e2gLkwpf-Glem7mrBTV339ZzdI6P1-y91rpGScY1bRHFxnk2-oMUoR4KGGxU96CyPlN0pMnIKtqr20qFnP-JqFvayUzgUf_U52CRFMwP3bf2kVuL6bbwTf6xdwHVj4-rMPn5TCsfSiBogM4LOOL4ITv0aNI3ItgiiIQy7DUa7GnP1iLMyOnncxRP_WoBJ9pf5RdpbmGIqaf_7lZg6zQEXLAni5YElxHLCMob1knsgCk5oVeq0zBW0I2PyQ"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-[#FF8040]/10 border-l-4 border-[#FF8040] text-[#FF8040] p-4 mb-6 rounded-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input border border-gray-300 rounded-lg py-4 px-12 w-full focus:outline-none focus:border-[#0046FF] focus:ring-4 focus:ring-blue-200 transition-all"
            />
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              mail_outline
            </span>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input border border-gray-300 rounded-lg py-4 px-12 w-full focus:outline-none focus:border-[#0046FF] focus:ring-4 focus:ring-blue-200 transition-all"
            />
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              lock_outline
            </span>
            <span
              className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="signin-button w-full text-white font-bold py-4 px-4 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#001BB7] to-[#0046FF] transition-all hover:shadow-lg hover:-translate-y-1"
            disabled={loading}
          >
            {!loading ? (
              <span>Sign in</span>
            ) : (
              <div className="loader border-2 border-gray-200 border-t-2 border-t-[#0046FF] rounded-full w-4 h-4 animate-spin" />
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register-step1")}
              className="font-medium text-blue-600 hover:underline transition-colors cursor-pointer"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
