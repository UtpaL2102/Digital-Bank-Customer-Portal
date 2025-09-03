// src/pages/RegisterStep1.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../RegisterStep1.css";

export default function RegisterStep1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/register-step2"); // Redirect to KYC step
  };

  const handleTabClick = (tab) => {
    if (tab === "kyc") {
      navigate("/register-step2");
    }
  };

  return (
    <div className="register-container">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">DigitalSecure</h1>
        </div>

        {/* Card */}
        <div className="register-card space-y-6">
          {/* Step Tabs */}
          <div>
            <div className="flex justify-center items-center mb-6">
              <div className="flex items-center bg-gray-200 rounded-full p-1">
                <span
                  className="tab-active cursor-pointer"
                  onClick={() => handleTabClick("account")}
                >
                  Account
                </span>
                <span
                  className="tab-inactive cursor-pointer"
                  onClick={() => handleTabClick("kyc")}
                >
                  KYC
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create your account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="form-label">
                Full name
              </label>
              <div className="input-wrapper">
                <i className="material-icons input-icon">person_outline</i>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Alex Johnson"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <i className="material-icons input-icon">email_outline</i>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@domain.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="form-label">
                Phone number
              </label>
              <div className="input-wrapper">
                <i className="material-icons input-icon">phone_outline</i>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="+1 202 555 0199"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <i className="material-icons input-icon">lock_outline</i>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="mt-2">
                <div className="password-strength-bar">
                  <div className="password-strength-fill"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password strength</p>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <div className="input-wrapper">
                <i className="material-icons input-icon">lock_outline</i>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Toggle Terms */}
            <div className="flex items-center space-x-3">
              <div className="toggle-wrapper">
                <input
                  type="checkbox"
                  id="toggle"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="toggle-checkbox"
                />
                <label htmlFor="toggle" className="toggle-label"></label>
              </div>
              <label htmlFor="toggle" className="text-sm text-gray-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Terms
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Info Box */}
            <div className="info-box">
              <i className="material-icons">error_outline</i>
              <p>
                Please make sure to read our terms and policy before proceeding.
              </p>
            </div>

            {/* Continue Button */}
            <div>
              <button type="submit" className="gradient-btn submit-btn">
                Continue
              </button>
            </div>
          </form>

         {/* Sign In Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
