import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../ProfileSecurity.css";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function ProfileSecurity() {
  const [profileData, setProfileData] = useState({
    full_name: "",
    phone: "",
    email: "",
  });
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [backupCodesList, setBackupCodesList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [hasPendingBackupCodes, setHasPendingBackupCodes] = useState(false);
  const [hasViewedBackupCodes, setHasViewedBackupCodes] = useState(false);

  // Check for pending backup codes on mount
  useEffect(() => {
    const pendingCodes = sessionStorage.getItem('pending_backup_codes');
    if (pendingCodes) {
      setBackupCodesList(JSON.parse(pendingCodes));
      setHasPendingBackupCodes(true);
      // Don't remove from session storage until user has viewed them
    }
  }, []);

  // Handler for when user views backup codes
  const handleViewBackupCodes = () => {
    setShowBackupCodes(true);
    setHasViewedBackupCodes(true);
    setHasPendingBackupCodes(false);
    // Clear from session storage after viewing
    sessionStorage.removeItem('pending_backup_codes');
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const token = getAuthToken();
      const payload = {
        full_name: profileData.full_name,
        phone: profileData.phone,
      };

      await api.profile.updateMe(payload, token);
      setSuccessMessage("Profile updated successfully");
    } catch (err) {
      console.error('Failed to save profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Function to load user's 2FA status and profile
  const loadProfileData = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      if (!token) {
        throw new Error('No auth token found');
      }
      
      // Get profile data which includes 2FA status
      const response = await api.profile.getMe(token);
      
      setProfileData({
        full_name: response.user.name || "",
        phone: response.user.phone_number || "",
        email: response.user.email || "",
      });
      
      // Get 2FA status from the profile response
      const mfaEnabled = response.user.two_fa_enabled || false;
      setTwoFAEnabled(mfaEnabled);
      
      // If 2FA is enabled, try to get backup codes
      if (mfaEnabled) {
        try {
          const backupCodesResponse = await api.auth.backupCodes(token);
          if (backupCodesResponse?.codes?.length > 0) {
            setBackupCodesList(backupCodesResponse.codes);
          }
        } catch (err) {
          console.warn('Failed to load backup codes:', err);
        }
      }
      
      // Check for pending backup codes from recent 2FA setup
      const pendingCodes = sessionStorage.getItem('pending_backup_codes');
      if (pendingCodes) {
        const codes = JSON.parse(pendingCodes);
        setBackupCodesList(codes);
        setHasPendingBackupCodes(true);
      }
      
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError(err.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Load profile data on mount and when location changes
  useEffect(() => {
    loadProfileData();
  }, [location]);
  
  // Also refresh data whenever 2FA status changes
  useEffect(() => {
    const refreshInterval = setInterval(loadProfileData, 5000);
    return () => clearInterval(refreshInterval);
  }, []);

  // Handle enabling/disabling 2FA
  const handleToggle2FA = async (e) => {
    setError("");
    const enabled = e.target.checked;
    
    if (enabled) {
      try {
        const token = getAuthToken();
        if (!token) {
          throw new Error("No auth token found");
        }
        const resp = await api.auth.enable2fa({}, token);
        if (resp.temp_secret_id) {
          navigate('/two-factor', { 
            state: { 
              tempSecretId: resp.temp_secret_id,
              otpauth_url: resp.otpauth_url
            }
          });
          // Update local state
          setTwoFAEnabled(true);
          // Refresh profile data to get latest 2FA status
          const profile = await api.profile.getMe(token);
          setTwoFAEnabled(profile.mfaEnabled || profile.two_fa_enabled || false);
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
                      value={profileData.full_name}
                      onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-[#0046FF] focus:ring-[#0046FF]"
                      placeholder="John Doe"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-[#0046FF] focus:ring-[#0046FF]"
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                      pattern="[+][0-9]{1,3}[-\s][0-9]{3,14}"
                      title="Enter a valid phone number starting with + and country code"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-[#0046FF] focus:ring-[#0046FF]"
                      placeholder="john.doe@example.com"
                      type="email"
                      required
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Change password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        id="current_password"
                        name="current_password"
                        className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-[#0046FF] focus:ring-[#0046FF]"
                        type="password"
                        required
                        minLength={8}
                      />
                    </div>
                    <div>
                      <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="new_password"
                        name="new_password"
                        className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-[#0046FF] focus:ring-[#0046FF]"
                        type="password"
                        required
                        minLength={8}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        title="Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm_password"
                        name="confirm_password"
                        className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-[#0046FF] focus:ring-[#0046FF]"
                        type="password"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white rounded-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                          Updating Password...
                        </>
                      ) : (
                        'Change Password'
                      )}
                    </button>
                  </div>
                </form>
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
                    onChange={handleToggle2FA}
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

              {!twoFAEnabled && (
                <div>
                  <label htmlFor="scan_qr" className="block text-sm font-medium text-gray-700 mb-1">
                    Scan QR in your app
                  </label>
                  <input
                    id="scan_qr"
                    className="form-input block w-full rounded-md border-gray-300 shadow-sm p-3"
                    placeholder="QR Code Input"
                    type="text"
                    disabled
                  />
                </div>
              )}

              {twoFAEnabled && (
                <div className="mt-6">
                  {/* Button to view backup codes */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Backup Codes</span>
                    <button
                      onClick={() => setShowBackupCodes(!showBackupCodes)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {showBackupCodes ? 'Hide Backup Codes' : 'Show Backup Codes'}
                    </button>
                  </div>

                  {/* Display area for backup codes */}
                  {showBackupCodes && (
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Your Backup Codes:</h4>
                        {backupCodesList.length > 0 ? (
                          <>
                            <div className="grid grid-cols-2 gap-3 font-mono">
                              {backupCodesList.map((code, index) => (
                                <div key={index} className="p-2 bg-white rounded border border-gray-300 text-center">
                                  {code}
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(backupCodesList.join('\n'));
                                setSuccessMessage('Backup codes copied to clipboard');
                              }}
                              className="mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded border hover:bg-gray-200"
                            >
                              Copy All Codes
                            </button>
                          </>
                        ) : (
                          <p className="text-gray-600">No backup codes available</p>
                        )}
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>Important:</strong> Save these backup codes in a secure location. You'll need them if you lose access to your authenticator app.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
                <p className="text-sm text-blue-700">
                  <span className="font-bold">Security Tip:</span> Two-factor authentication adds an extra layer of security to your account by requiring both your password and a code from your authenticator app.
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

          {/* Action buttons */}
          <div className="flex justify-start gap-4 mt-8">
            {error && (
              <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 bg-green-50 text-green-600 p-4 rounded-lg">
                {successMessage}
              </div>
            )}
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={saving}
              className="gradient-btn text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 mr-2 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
