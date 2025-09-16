import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ProfileSecurity.css"; // make sure this path matches your project

export default function ProfileSecurity() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  
  // If user has 2FA backup codes from setup
  const location = useLocation();
  const backupCodes = location.state?.backup_codes;

  // Handle enabling/disabling 2FA
  const handleToggle2FA = async (e) => {
    setError("");
    const enabled = e.target.checked;
    
    if (enabled) {
      try {
        const token = sessionStorage.getItem("access_token");
        const resp = await api.auth.enable2fa({}, token);
        if (resp.temp_secret_id) {
          navigate('/two-factor', { 
            state: { 
              tempSecretId: resp.temp_secret_id,
              otpauth_url: resp.otpauth_url
            }
          });
        }
      } catch (err) {
        console.error('2FA enable failed:', err);
        setError(err?.message || 'Failed to enable 2FA');
        e.target.checked = false; // Revert toggle
      }
    } else {
      // Handle disable flow (requires current password + 2FA code)
      const password = prompt("Enter your password to disable 2FA:");
      if (!password) {
        e.target.checked = true; // Keep enabled if cancelled
        return;
      }
      const code = prompt("Enter your 2FA code to confirm:");
      if (!code) {
        e.target.checked = true;
        return;
      }

      try {
        const token = sessionStorage.getItem("access_token");
        await api.auth.disable2fa({ password, code }, token);
        setTwoFAEnabled(false);
        setSuccessMessage("2FA has been disabled");
      } catch (err) {
        console.error('2FA disable failed:', err);
        setError(err?.message || 'Failed to disable 2FA');
        e.target.checked = true; // Keep enabled
      }
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const currentPassword = document.getElementById('current_password').value;
    const newPassword = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("access_token");
      const payload = { current_password: currentPassword, new_password: newPassword };
      
      if (twoFAEnabled) {
        const code = prompt("Enter your 2FA code to confirm password change:");
        if (!code) {
          setLoading(false);
          return;
        }
        payload.code = code;
      }

      await api.auth.changePassword(payload, token);
      setSuccessMessage("Password changed successfully");
      
      // Clear password fields
      document.getElementById('current_password').value = '';
      document.getElementById('new_password').value = '';
      document.getElementById('confirm_password').value = '';
    } catch (err) {
      console.error('Password change failed:', err);
      setError(err?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header (aligned like your other pages) */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-gray-900">Digital Bank</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile &amp; Security</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full name
                    </label>
                    <input
                      id="full_name"
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Change password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current
                    </label>
                    <input
                      id="current_password"
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                      type="password"
                    />
                  </div>
                  <div>
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                      New
                    </label>
                    <input
                      id="new_password"
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                      type="password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm
                    </label>
                    <input
                      id="confirm_password"
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Two-factor authentication</h3>
              <p className="text-sm text-gray-600 mb-6">Protect your account with an extra step.</p>

              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-700">
                  Status:{" "}
                  <span className="font-bold text-blue-800">
                    {twoFAEnabled ? "Enabled" : "Disabled"}
                  </span>
                </span>

                {/* Toggle */}
                <div className="toggle-container">
                  <input
                    id="twofa-toggle"
                    type="checkbox"
                    className="toggle-input"
                    checked={twoFAEnabled}
                    onChange={(e) => setTwoFAEnabled(e.target.checked)}
                    aria-checked={twoFAEnabled}
                    role="switch"
                  />
                  <label htmlFor="twofa-toggle" className="toggle-track" />
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="flex-shrink-0">
                  <span className="material-icons text-blue-700" style={{ fontSize: 28 }}>
                    security
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">Authenticator app</p>
              </div>

              <div>
                <label htmlFor="scan_qr" className="block text-sm font-medium text-gray-700 mb-1">
                  Scan QR in your app
                </label>
                <input
                  id="scan_qr"
                  className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                  placeholder="QR Code Input"
                  type="text"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="backup_codes" className="block text-sm font-medium text-gray-700 mb-1">
                  Backup codes
                </label>
                <input
                  id="backup_codes"
                  className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                  type="text"
                  readOnly
                  value="Download codes"
                />
              </div>

              <div className="mt-4 p-3 bg-orange-100 border-l-4 border-orange-500 rounded-r-md">
                <p className="text-sm text-orange-700">
                  <span className="font-bold">Important:</span> Save your backup codes in a safe place.
                </p>
              </div>

              {/* View Sessions Button */}
              <div className="mt-6">
  <button
    onClick={() => navigate("/sessions")}
    className="gradient-btn text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
  >
    View Active Sessions
  </button>
</div>

            </div>
          </div>

          <div className="flex justify-start -mt-12">
  <button
    type="submit"
    className="gradient-btn text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
  >
    Save Changes
  </button>
</div>

        </div>
      </main>
    </div>
  );
}
