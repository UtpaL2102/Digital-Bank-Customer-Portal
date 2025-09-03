import React, { useState, useRef } from "react";
import "../ResetPassword.css";

export default function ResetPassword() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const inputsRef = useRef([]);

  const handleCodeChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="text-center">
          <h1>Verify code & reset</h1>
          <p className="email-text">We sent a 6-digit code to your email.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-space-y">
          {/* Enter code label */}
          <div className="form-group">
            <label className="form-label">Enter code</label>
            <div className="code-inputs">
              {code.map((c, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={c}
                  onChange={(e) => handleCodeChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  pattern="[0-9]"
                  required
                  className="code-input"
                />
              ))}
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label>New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              required
            />
            <p className="password-note">
              Password must be at least 8 characters long.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Reset Button */}
          <div className="button-container">
            <button type="submit" className="reset-button">
              Reset Password
            </button>
          </div>
        </form>
      </div>

      {showToast && (
        <div className="toast-success">
          <span className="material-icons">check_circle</span>
          <p>Password reset successfully!</p>
        </div>
      )}
    </div>
  );
}
