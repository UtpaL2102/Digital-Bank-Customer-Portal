import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";
import "../RegisterStep2.css";

export default function RegisterStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idType: 'Passport',
    idNumber: '',
    dob: '',
    addressLine1: '',
    city: '',
    stateProvince: '',
    postalCode: ''
  });
  const [files, setFiles] = useState({
    idFront: null,
    selfie: null,
    addressProof: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const handleFileChange = (type, file) => {
  //   setFiles(prev => ({
  //     ...prev,
  //     [type]: file
  //   }));
  // };

  // Upload file immediately on selection
  const handleFileChange = async (type, file) => {
    setFiles(prev => ({ ...prev, [type]: file }));
    const fd = new FormData();
    fd.append('doc_kind', type === 'idFront' ? 'id_front' : type === 'selfie' ? 'selfie' : 'address_proof');
    fd.append('file', file);
    try {
      await api.kyc.uploadDocument(fd, getAuthToken());
      // show success toast or mark file uploaded
    } catch (e) {
      // show error
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate files
    if (!files.idFront || !files.selfie) {
      setError("Please upload both ID front and selfie");
      return;
    }

    // Validate file sizes
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (files.idFront.size > maxSize || files.selfie.size > maxSize || 
        (files.addressProof && files.addressProof.size > maxSize)) {
      setError("File size must be less than 10MB");
      return;
    }

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(files.idFront.type) || 
        !allowedTypes.includes(files.selfie.type) ||
        (files.addressProof && !allowedTypes.includes(files.addressProof.type))) {
      setError("Files must be images (JPG, PNG) or PDF");
      return;
    }

    setLoading(true);

    try {
      // Upload documents one by one
      try {
        // Upload ID Front
        const idFormData = new FormData();
        idFormData.append('doc_kind', 'id_front');
        idFormData.append('file', files.idFront);
        await api.kyc.uploadDocument(idFormData, getAuthToken());

        // Upload Selfie
        const selfieFormData = new FormData();
        selfieFormData.append('doc_kind', 'selfie');
        selfieFormData.append('file', files.selfie);
        await api.kyc.uploadDocument(selfieFormData, getAuthToken());

        // Upload Address Proof if provided
        if (files.addressProof) {
          const addressFormData = new FormData();
          addressFormData.append('doc_kind', 'address_proof');
          addressFormData.append('file', files.addressProof);
          await api.kyc.uploadDocument(addressFormData, getAuthToken());
        }
      } catch (uploadError) {
        console.error('Document upload error:', uploadError);
        if (uploadError instanceof TypeError && uploadError.message === 'Failed to fetch') {
          setError('Unable to connect to the server. Please check your internet connection and try again.');
        } else {
          setError('Error uploading documents: ' + (uploadError.message || 'Unknown error'));
        }
        setLoading(false);
        return;
      }

      // Submit KYC data
      try {
        await api.kyc.submitKyc({
          document_type: formData.idType,
          document_number: formData.idNumber,
          address_line1: formData.addressLine1,
          city: formData.city,
          state: formData.stateProvince,
          postal_code: formData.postalCode
        }, getAuthToken());

        navigate("/kyc-status");
      } catch (submitError) {
        console.error('KYC submission error:', submitError);
        setError('Error submitting KYC data: ' + (submitError.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('KYC process error:', err);
      setError(err.message || "Failed to submit KYC. Please try again.");
    } finally {
      setLoading(false);
    }
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
                    <select 
                      className="bordered-chip-input w-full" 
                      id="id_type" 
                      name="id_type"
                      value={formData.idType}
                      onChange={(e) => setFormData(prev => ({ ...prev, idType: e.target.value }))}
                    >
                      <option value="Passport">Passport</option>
                      <option value="Driver's License">Driver's License</option>
                      <option value="National ID">National ID</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="id_number">ID number</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="id_number"
                      name="id_number"
                      type="text"
                      required
                      value={formData.idNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                      placeholder="Enter ID number"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="dob">Date of birth</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="dob"
                      name="dob"
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
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
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                    placeholder="Enter your address"
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
                      required
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="state_province">State/Province</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="state_province"
                      name="state_province"
                      type="text"
                      required
                      value={formData.stateProvince}
                      onChange={(e) => setFormData(prev => ({ ...prev, stateProvince: e.target.value }))}
                      placeholder="Enter state/province"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="postal_code">Postal code</label>
                    <input
                      className="bordered-chip-input w-full"
                      id="postal_code"
                      name="postal_code"
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>

                {/* Upload Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Government ID (front/back)</label>
                    <div 
                      className={`drag-drop-zone p-6 text-center cursor-pointer ${files.idFront ? 'border-green-500' : ''}`}
                      onClick={() => document.getElementById('idFront').click()}
                    >
                      <input
                        type="file"
                        id="idFront"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange('idFront', e.target.files[0])}
                      />
                      <span className="material-icons text-gray-400 text-4xl">
                        {files.idFront ? 'check_circle' : 'cloud_upload'}
                      </span>
                      <p className="mt-2 text-sm text-gray-600">
                        {files.idFront ? files.idFront.name : 'Drop files or click to upload'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Address proof (optional)</label>
                    <div 
                      className={`drag-drop-zone p-6 text-center cursor-pointer ${files.addressProof ? 'border-green-500' : ''}`}
                      onClick={() => document.getElementById('addressProof').click()}
                    >
                      <input
                        type="file"
                        id="addressProof"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange('addressProof', e.target.files[0])}
                      />
                      <span className="material-icons text-gray-400 text-4xl">
                        {files.addressProof ? 'check_circle' : 'cloud_upload'}
                      </span>
                      <p className="mt-2 text-sm text-gray-600">
                        {files.addressProof ? files.addressProof.name : 'e.g., Utility bill or bank statement'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Live selfie */}
                <div>
                  <label className="form-label">Live selfie</label>
                  <div 
                    className={`drag-drop-zone p-6 text-center cursor-pointer flex flex-col items-center justify-center h-48 ${files.selfie ? 'border-green-500' : ''}`}
                    onClick={() => document.getElementById('selfie').click()}
                  >
                    <input
                      type="file"
                      id="selfie"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      onChange={(e) => handleFileChange('selfie', e.target.files[0])}
                    />
                    <span className="material-icons text-gray-400 text-4xl">
                      {files.selfie ? 'check_circle' : 'photo_camera'}
                    </span>
                    <p className="mt-2 text-sm text-gray-600">
                      {files.selfie ? files.selfie.name : 'Take a photo or upload one'}
                    </p>
                  </div>
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm mt-2">
                    {error}
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    className="custom-checkbox mr-3"
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setError("Please consent to identity verification");
                      } else {
                        setError(null);
                      }
                    }}
                  />
                  <label className="text-sm text-gray-600" htmlFor="consent">
                    I consent to identity verification and data processing.
                  </label>
                </div>

                <div className="flex justify-end items-center space-x-4 pt-4">
                  <button
                    className="btn-secondary font-semibold py-3 px-6 rounded-lg"
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    Back
                  </button>
                  <button
                    className="btn-primary text-white font-semibold py-3 px-8 rounded-lg relative"
                    type="submit"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="opacity-0">Verify</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                      </>
                    ) : (
                      'Verify'
                    )}
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
