import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyAccount() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add verification logic here later
    navigate("/minimal-dashboard"); // redirect to minimal dashboard
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Manrope', sans-serif",
        backgroundColor: "#F5F7FA",
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          display: "none",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "33%",
          padding: "3rem",
          color: "white",
          background: "linear-gradient(to bottom right, #001BB7, #0046FF)",
        }}
        className="lg:flex"
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            DigitalSecure
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "1.125rem", opacity: 0.8 }}>
            Your financial journey, simplified and secure.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "2.5rem", opacity: 0.8 }}
            >
              security
            </span>
            <p style={{ fontSize: "1.125rem" }}>Bank-level security</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "2.5rem", opacity: 0.8 }}
            >
              support_agent
            </span>
            <p style={{ fontSize: "1.125rem" }}>24/7 customer support</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "2.5rem", opacity: 0.8 }}
            >
              credit_card
            </span>
            <p style={{ fontSize: "1.125rem" }}>Transparent fees</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", width: "100%" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "2rem",
            }}
          >
            {/* Progress Bar */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <p
                  style={{
                    color: "#475a9e",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Step 2 of 2
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "0.5rem",
                  backgroundColor: "#F0F2F5",
                  borderRadius: "9999px",
                }}
              >
                <div
                  style={{
                    width: "66.66%",
                    height: "0.5rem",
                    backgroundColor: "#0046FF",
                    borderRadius: "9999px",
                  }}
                ></div>
              </div>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "#0d101c",
                marginBottom: "0.5rem",
              }}
            >
              Verify your account
            </h2>
            <p style={{ color: "#475a9e", marginBottom: "2rem" }}>
              We've sent a 6-digit code to your registered email address. Please
              enter it below.
            </p>

            {/* Form */}
            <form
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="verification-code" style={{ display: "none" }}>
                  Verification Code
                </label>
                <input
                  id="verification-code"
                  name="verification-code"
                  type="text"
                  required
                  placeholder="Enter 6-digit code"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #ccc",
                    backgroundColor: "#F0F2F5",
                    color: "#0d101c",
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: "linear-gradient(to right, #001BB7, #0046FF)",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Verify Account
              </button>
            </form>

            {/* Resend Code */}
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem", color: "#475a9e" }}>
                Didn't receive the code?{" "}
                <a href="#" style={{ color: "#0046FF", fontWeight: "500" }}>
                  Resend code
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
