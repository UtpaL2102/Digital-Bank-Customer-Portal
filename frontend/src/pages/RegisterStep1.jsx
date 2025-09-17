import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../register.css";
import {api} from '../lib/api';

export default function Register() {
  const navigate = useNavigate();

 const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const payload = {
      name: document.getElementById('fullname').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone_number: document.getElementById('phone').value.trim(),
      password: password
    };

    try {
      const resp = await api.auth.register(payload);
      // Got netbanking_id, move to step 2
      navigate('/register-step2', { state: { netbanking_id: resp.netbanking_id }});
    } catch (err) {
      console.error('Register failed:', err);
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--neutral-background)] min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Side */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-[var(--navy-blue)] to-[var(--bright-blue)] text-white p-6 md:p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-20%] w-52 h-52 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-[-15%] left-[-15%] w-72 h-72 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">DigitalSecure</h1>
            <p className="text-base md:text-lg text-blue-200 mb-10">
              Your Trusted Digital Banking Partner. Secure, Swift, and Simple.
            </p>
            <div className="flex justify-around text-center">
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-3">
                  <span className="material-symbols-outlined text-3xl">shield</span>
                </div>
                <span className="font-semibold text-sm md:text-base">Secure Banking</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-3">
                  <span className="material-symbols-outlined text-3xl">lock_person</span>
                </div>
                <span className="font-semibold text-sm md:text-base">Data Privacy</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-3">
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <span className="font-semibold text-sm md:text-base">Fast Transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-3/5 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[var(--neutral-background)]">
          <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="text-left mb-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="account-text">
                Already have an account?{" "}
                <Link to="/login" className="signin-link">
                  Sign in
                </Link>
              </p>
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="mb-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[var(--navy-blue)] to-[var(--bright-blue)] flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <span className="ml-2 text-sm md:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--navy-blue)] to-[var(--bright-blue)]">
                      Account Details
                    </span>
                  </div>
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-[var(--bright-blue)] to-gray-200 mx-2"></div>
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end">
                    <span className="mr-2 text-xs md:text-sm font-medium text-gray-400">
                      Verification
                    </span>
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-bold">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleCreateAccount}>
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 bg-[var(--neutral-panel)] border-transparent rounded-md focus:ring-2 focus:ring-[var(--bright-blue)] focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-[var(--neutral-panel)] border-transparent rounded-md focus:ring-2 focus:ring-[var(--bright-blue)] focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 bg-[var(--neutral-panel)] border-transparent rounded-md focus:ring-2 focus:ring-[var(--bright-blue)] focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  className="w-full px-3 py-2 bg-[var(--neutral-panel)] border-transparent rounded-md focus:ring-2 focus:ring-[var(--bright-blue)] focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 bg-[var(--neutral-panel)] border-transparent rounded-md focus:ring-2 focus:ring-[var(--bright-blue)] focus:border-transparent transition"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="h-4 w-4 text-[var(--bright-blue)] focus:ring-[var(--bright-blue)] border-[var(--neutral-panel)] rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-xs md:text-sm text-gray-600">
                  I agree to the{" "}
                  <a className="font-medium text-gradient" href="#">
                    Terms &amp; Privacy Policy
                  </a>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm md:text-base font-bold text-white bg-gradient-to-r from-[var(--navy-blue)] to-[var(--bright-blue)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--bright-blue)] transition-all duration-300 button-glow disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
