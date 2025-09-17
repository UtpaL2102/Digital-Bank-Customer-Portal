import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken, clearAuthTokens } from "../lib/authHelpers";
import "../MinimalDashboard.css";

export default function MinimalDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.auth.me(getAuthToken());
        setUser(response.user);
      } catch (error) {
        // If error is about KYC, we can ignore it in minimal dashboard
        if (!error.message?.includes('KYC')) {
          console.error('Failed to fetch user:', error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleStartVerification = () => {
    navigate("/register-step2");
  };

  const handleLogout = () => {
    clearAuthTokens();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <a href="#" className="brand">
          <span>DigitalSecure</span>
        </a>
        <nav className="menu">
          <div className="menu-item active">
            <span className="material-icons">dashboard</span>
            <span>Dashboard</span>
          </div>
          <button onClick={handleLogout} className="menu-item logout">
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <div>
            <h1>Welcome, {user?.name || 'User'}</h1>
            <p className="text-sm text-gray-600">Complete verification to access all features</p>
          </div>
        </header>

        {/* KYC Section */}
        <section className="kyc-card">
          <div className="kyc-content">
            <div>
              <h2>Complete Your KYC</h2>
              <p>
                Verify your identity to unlock all features and benefits of your
                DigitalSecure account. It’s a quick and secure process.
              </p>
            </div>
            <button className="btn-glow" onClick={handleStartVerification}>
              Start Verification
            </button>
          </div>
        </section>

        {/* Cards */}
        <div className="cards">
          {/* Phone Number */}
          <div
            className="card cursor-pointer"
            onClick={() => navigate("/two-factor-setup")}
          >
            <div className="card-icon orange">
              <span className="material-icons">contact_phone</span>
            </div>
            <div>
              <h3>Add Your Phone Number</h3>
              <p>
                Secure your account with two-factor authentication for an extra
                layer of protection.
              </p>
            </div>
          </div>

          {/* Security Reminders */}
          <div
            className="card cursor-pointer"
            onClick={() => navigate("/profile-security")}
          >
            <div className="card-icon blue">
              <span className="material-icons">security</span>
            </div>
            <div>
              <h3>Security Reminders</h3>
              <p>
                Review and update your security settings for optimal protection
                of your account.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
