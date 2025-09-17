// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const identifier = (email || "").trim();
      const passwordValue = (password || "").trim();

      if (!identifier || !passwordValue) {
        setError("Please enter both email and password");
        setLoading(false);
        return;
      }

      // Use appropriate login endpoint based on role
      const resp =
        role === "admin"
          ? await api.auth.adminLogin({ email: identifier, password: passwordValue })
          : await api.auth.login({ identifier, password: passwordValue });

      if (resp.requires2fa) {
        // go to TwoFactor page and pass temp_login_token (if provided) and identifier/password fallback
        navigate("/two-factor", {
          state: { tempLoginToken: resp.temp_login_token, identifier, password: passwordValue },
        });
        return;
      }

      // Normal login success - store tokens and redirect
      if (resp.access_token) {
        sessionStorage.setItem("access_token", resp.access_token);
        sessionStorage.setItem("refresh_token", resp.refresh_token);
        // Store user data to avoid an immediate /me call
        // sessionStorage.setItem("user", JSON.stringify(resp.user));
        // Prefer resp.user but fall back to resp (some login endpoints return user at top-level)
        const userToStore = resp.user || resp || null;
        if (userToStore) {
          sessionStorage.setItem("user", JSON.stringify(userToStore));
        } else {
          sessionStorage.removeItem("user");
        }

        console.debug("Login stored user:", userToStore, "raw resp:", resp);

        // Redirect based on role and status
        if ((userToStore && userToStore.role === "admin") || resp.user?.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (userToStore?.status === "verified" || resp.user?.status === "verified") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/minimal-dashboard", { replace: true });
        }
      }
    } catch (err) {
      console.error("Login failed", err);
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Unable to connect to the server. Please ensure the backend service is running.");
      } else {
        setError(err?.error?.message || err.message || "Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-100 flex items-center justify-center min-h-screen p-4"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#001BB7] to-[#0046FF] bg-clip-text text-transparent">
            DigitalSecure
          </h1>
          <p className="text-gray-500 mt-2">Welcome back</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-200 rounded-full p-1 relative w-48 mx-auto">
          {["user", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 text-center py-2 px-3 rounded-full text-xs font-medium transition-all ${
                role === r
                  ? "bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white shadow-md"
                  : "text-gray-600"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg py-4 px-12 w-full focus:outline-none focus:border-[#0046FF] focus:ring-4 focus:ring-blue-200 transition-all"
            />
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              mail_outline
            </span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-lg py-4 px-12 w-full focus:outline-none focus:border-[#0046FF] focus:ring-4 focus:ring-blue-200 transition-all"
            />
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
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
          <div className="text-right">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-gray-500 hover:text-[#0046FF] transition-colors cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-[#001BB7] to-[#0046FF] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            {loading ? (
              <div className="border-2 border-gray-200 border-t-2 border-t-[#0046FF] rounded-full w-4 h-4 animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/register-step1")}
            className="font-medium text-[#0046FF] hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
