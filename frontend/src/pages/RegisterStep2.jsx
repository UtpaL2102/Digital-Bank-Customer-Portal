import React from "react";
import { useNavigate } from "react-router-dom";
import "../RegisterStep2.css";

export default function RegisterStep2() {
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    // Navigate to KYC Status page
    navigate("/kyc-status");
  };

  return (
    <div className="register2-container p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800">DigitalSecure</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="form-card p-6 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">KYC Verification</h2>
                <p className="text-gray-500 mt-1">
                  Provide your KYC details for verification.
                </p>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label" htmlFor="id_type">ID type</label>
                    <select className="bordered-chip-input w-full" id="id_type" name="id_type">
                      <option>Passport</option>
                      <option>Driver's License</option>
                      <option>National ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="id_number">ID number</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="id_number"
                      name="id_number"
                      type="text"
                      defaultValue="P12345678"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="dob">Date of birth</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="dob"
                      name="dob"
                      type="date"
                      defaultValue="1995-04-20"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="address_line_1">Address line 1</label>
                  <input
                    className="bordered-chip-input w-full"
                    id="address_line_1"
                    name="address_line_1"
                    type="text"
                    defaultValue="221B Baker Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label" htmlFor="city">City</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="city"
                      name="city"
                      type="text"
                      defaultValue="London"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="state_province">State/Province</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="state_province"
                      name="state_province"
                      type="text"
                      defaultValue="Greater London"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="postal_code">Postal code</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="postal_code"
                      name="postal_code"
                      type="text"
                      defaultValue="NW1 6XE"
                    />
                  </div>
                </div>

                {/* Upload Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Government ID (front/back)</label>
                    <div className="drag-drop-zone p-6 text-center cursor-pointer">
                      <span className="material-icons text-gray-400 text-4xl">cloud_upload</span>
                      <p className="mt-2 text-sm text-gray-600">Drop files or click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Address proof</label>
                    <div className="drag-drop-zone p-6 text-center cursor-pointer">
                      <span className="material-icons text-gray-400 text-4xl">cloud_upload</span>
                      <p className="mt-2 text-sm text-gray-600">e.g., Utility bill or bank statement</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Live selfie */}
                <div>
                  <label className="form-label">Live selfie</label>
                  <div className="drag-drop-zone p-6 text-center cursor-pointer flex flex-col items-center justify-center h-48">
                    <span className="material-icons text-gray-400 text-4xl">photo_camera</span>
                    <p className="mt-2 text-sm text-gray-600">Enable camera</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    className="custom-checkbox mr-3"
                    id="consent"
                    name="consent"
                    type="checkbox"
                  />
                  <label className="text-sm text-gray-600" htmlFor="consent">
                    I consent to identity verification and data processing.
                  </label>
                </div>

                <div className="flex justify-end items-center space-x-4 pt-4">
                  <button
                    className="btn-secondary font-semibold py-3 px-6 rounded-lg"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    className="btn-primary text-white font-semibold py-3 px-8 rounded-lg"
                    type="submit"
                    onClick={handleVerify}
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Side Cards */}
          <div className="space-y-8">
            <div className="form-card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">KYC status</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-gray-400 mr-3"></span>
                  <span className="text-gray-500 font-medium">Not started</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-3 animate-pulse"></span>
                  <span className="text-blue-600 font-bold">Verifying...</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-3"></span>
                  <span className="text-green-600 font-medium">Verified</span>
                </div>
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full bg-orange-500 mr-3"
                    style={{ backgroundColor: "#FF8040" }}
                  ></span>
                  <span
                    className="text-orange-600 font-medium"
                    style={{ color: "#FF8040" }}
                  >
                    Failed (mismatch)
                  </span>
                </div>
              </div>

              <div className="form-card mt-6 p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Verification ID</p>
                    <p className="font-semibold text-gray-800">KYC-2025-000142</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 text-right">Score</p>
                    <p className="font-semibold text-gray-800 text-right">0.92</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                We'll send a notification when KYC is completed.
              </p>
            </div>

            <div className="form-card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Tips</h3>
              <div className="flex flex-wrap gap-3">
                <div className="pill-chip" title="Ensure your face is clearly visible with no strong shadows.">
                  Good lighting
                </div>
                <div className="pill-chip" title="The address on your proof document must match the address entered exactly.">
                  Match address exactly
                </div>
                <div className="pill-chip" title="Remove any hats or glasses before taking your selfie.">
                  No hat/glasses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
