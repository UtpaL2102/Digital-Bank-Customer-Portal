import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function KycStatus() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("PENDING");
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    api.kyc
      .getKycStatus(token)
      .then((response) => {
        setStatus(response.status);
        setDocuments(response.documents || []);
        setKycData(response);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch KYC status. Please try again later.");
        setLoading(false);
      });
  }, [navigate]);

  const [formData, setFormData] = useState({
    document_type: "",
    document_number: "",
    address_line1: "",
    city: "",
    state: "",
    postal_code: "",
  });

  const handleFileUpload = async (event, docKind) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const token = getAuthToken();
      const fd = new FormData();
      fd.append('doc_kind', docKind);
      fd.append('file', file);
      await api.kyc.uploadDocument(fd, token);

      // Refresh status after upload
      const response = await api.kyc.getKycStatus(token);
      setStatus(response.status);
      setDocuments(response.documents || []);
      setKycData(response);
      setError("");
    } catch (err) {
      setError("Failed to upload document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitKyc = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();

      // Submit KYC data
      await api.kyc.submitKyc(formData, token);

      // Refresh status after submission
      const response = await api.kyc.getKycStatus(token);
      setStatus(response.status);
      setKycData(response);
      setError("");
    } catch (err) {
      setError(
        "Failed to submit KYC. Please ensure all required documents are uploaded and form is filled correctly."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      case "UNDER_REVIEW":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen w-full p-4 md:p-8 font-inter">
      {/* Header */}
      <header className="pb-4 border-b border-gray-200">
        <h1 className="text-sm font-medium text-gray-600">DigitalSecure</h1>
      </header>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      {/* Main Section */}
      <main className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">KYC Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Timeline Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 md:p-8 relative">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              KYC Verification
            </h3>

            <div className="space-y-6">
              {/* Document Type and Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    name="document_type"
                    value={formData.document_type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="Passport">Passport</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="Driving License">Driving License</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Number
                  </label>
                  <input
                    type="text"
                    name="document_number"
                    value={formData.document_number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Address Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-6 mt-8">
                <h4 className="text-md font-medium text-gray-900">Required Documents</h4>
                
                {/* ID Proof */}
                <div className="border rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof (Front)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "id_front")}
                    accept="image/*,.pdf"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>

                {/* Selfie */}
                <div className="border rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live Selfie
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "selfie")}
                    accept="image/*"
                    capture="user"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>

            {status !== "APPROVED" && status !== "UNDER_REVIEW" && (
              <div className="mt-10">
                <button
                  onClick={handleSubmitKyc}
                  disabled={documents.length < 3}
                  className={`w-full sm:w-auto ${
                    documents.length < 3
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-900 to-blue-600 hover:shadow-lg"
                  } text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300`}
                >
                  Submit KYC for Review
                </button>
              </div>
            )}
          </div>

          {/* Current Result Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Current Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Verification ID</p>
                <p className="font-medium text-gray-800">
                  {kycData?.verificationId || "Not submitted"}
                </p>
              </div>
              <div
                className={`${
                  status === "REJECTED" ? "bg-red-50" : "bg-gray-50"
                } p-4 rounded-lg`}
              >
                <p
                  className={`text-sm ${
                    status === "REJECTED" ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  Status
                </p>
                <div className="flex items-center mt-1">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      status
                    )} mr-2`}
                  ></div>
                  <p className="text-lg font-bold text-gray-800">{status}</p>
                </div>
              </div>
              {status === "REJECTED" && kycData?.rejectionReason && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600">Reason</p>
                  <p className="font-semibold text-red-800">
                    {kycData.rejectionReason}
                  </p>
                </div>
              )}
              {kycData?.lastUpdated && (
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium text-gray-800">
                    {new Date(kycData.lastUpdated).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Submit Button */}
      {status !== "APPROVED" && status !== "UNDER_REVIEW" && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
          <button
            onClick={handleSubmitKyc}
            disabled={documents.length < 3}
            className={`w-full ${
              documents.length < 3
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-900 to-blue-600 hover:shadow-lg"
            } text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300`}
          >
            Submit KYC for Review
          </button>
        </div>
      )}
    </div>
  );
}
