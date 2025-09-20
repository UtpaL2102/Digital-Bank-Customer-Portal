import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TwoFactorForm from "./TwoFactorForm";
import {api} from "../lib/api";

export default function TwoFactorPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Two possible incoming states:
  // - { tempLoginToken }               -> login flow (call login-verify)
  // - { identifier, password }         -> (fallback login flow)
  // - { tempSecretId, otpauth_url }    -> setup flow (call verify)
  // - { notice }                       -> in case enable2fa just sent OTP to email/phone
  const tempLoginToken = state?.tempLoginToken;
  const identifier = state?.identifier;
  const password = state?.password;
  const tempSecretId = state?.tempSecretId;
  const otpauth_url = state?.otpauth_url;

  async function handleVerify(codeOrBackup) {
    // decide which endpoint to call
    if (tempLoginToken || identifier) {
      // Login flow -> call login-verify
      const payload = tempLoginToken
        ? { temp_login_token: tempLoginToken, code: codeOrBackup }
        : { identifier, password, code: codeOrBackup };

      const resp = await api.auth.loginVerify2fa(payload);
      if (resp?.access_token) {
        // persist tokens and user data
        sessionStorage.setItem("access_token", resp.access_token);
        sessionStorage.setItem("refresh_token", resp.refresh_token);
        
        // Store user data
        const userToStore = resp.user || resp || null;
        if (userToStore) {
          sessionStorage.setItem("user", JSON.stringify(userToStore));
        }

        // Navigate based on user role and status
        if (userToStore?.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (userToStore?.status === "verified") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/minimal-dashboard", { replace: true });
        }
        return;
      }
      throw new Error("2FA login verify failed");
    } else if (tempSecretId) {
      // Setup flow -> call verify (authenticated)
      const token = sessionStorage.getItem("access_token"); // or from context
      if (!token) {
        throw new Error("Missing auth token for 2FA setup verification");
      }
      const resp = await api.auth.verify2fa({ temp_secret_id: tempSecretId, code: codeOrBackup }, token);
      if (!resp) {
        throw new Error("No response from 2FA verification");
      }

      // Store backup codes and update session storage
      if (resp.backup_codes) {
        sessionStorage.setItem('pending_backup_codes', JSON.stringify(resp.backup_codes));
      }
      
      // Fetch fresh profile to get updated 2FA status
      const updatedProfile = await api.profile.getMe(token);
      sessionStorage.setItem('user', JSON.stringify(updatedProfile.user));
      
      // Navigate back to profile security with success message
      navigate("/profile-security", { 
        state: { 
          message: "2FA has been enabled successfully. Click 'Show Backup Codes' to view and save your backup codes." 
        }, 
        replace: true 
      });
      return;
    } else {
      // no context — go back to login
      navigate("/login");
      throw new Error("Missing 2FA context; please login again");
    }
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen flex items-center justify-center p-10">
      <div className="max-w-2xl w-full grid md:grid-cols-2 gap-6">
        {/* Show QR for setup flow if available */}
        {otpauth_url ? (
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold mb-3">Scan QR with authenticator app</h3>
            <img
              alt="otp-qr"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauth_url)}`}
            />
            <p className="text-sm text-gray-600 mt-3">
              Or enter secret manually: <code>{new URLSearchParams(otpauth_url.split("?")[1]).get("secret")}</code>
            </p>
          </div>
        ) : null}

        {/* OTP form (used for both flows) */}
        <div>
          <TwoFactorForm onSubmit={handleVerify} showResend={!tempSecretId} />
        </div>
      </div>
    </div>
  );
}
