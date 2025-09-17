import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getAuthToken } from "../lib/authHelpers";

export default function AdminKycDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    loadKycDetails(token);
  }, [userId, navigate]);

  const loadKycDetails = async (token) => {
    try {
      const response = await api.kyc.getUserKyc(userId, token);
      setKycData(response);
    } catch (err) {
      setError("Failed to load KYC details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      await api.kyc.approveKyc(userId, {}, token);
      navigate("/admin/kyc");
    } catch (err) {
      setError("Failed to approve KYC. Please try again.");
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setError("Please provide a rejection reason.");
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();
      await api.kyc.rejectKyc(userId, { reason: rejectionReason }, token);
      navigate("/admin/kyc");
    } catch (err) {
      setError("Failed to reject KYC. Please try again.");
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              KYC Review - User {userId}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Review user's KYC documents and information
            </p>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadgeColor(
              kycData?.status
            )}`}
          >
            {kycData?.status}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          {/* Document Preview Section */}
          <div className="sm:col-span-2">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Documents</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {kycData?.documents?.map((doc) => (
                <div
                  key={doc.type}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <h5 className="font-medium text-gray-900 mb-2">
                    {doc.type.replace("_", " ").toUpperCase()}
                  </h5>
                  {doc.url ? (
                    <div className="aspect-w-3 aspect-h-2">
                      {doc.contentType?.startsWith("image/") ? (
                        <img
                          src={doc.url}
                          alt={doc.type}
                          className="object-cover rounded"
                        />
                      ) : (
                        <iframe
                          src={doc.url}
                          title={doc.type}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No preview available</p>
                  )}
                  <div className="mt-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Full Document
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Information */}
          <div className="sm:col-span-2">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              User Information
            </h4>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Submission Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(kycData?.submissionDate).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(kycData?.lastUpdated).toLocaleString()}
                </dd>
              </div>
              {kycData?.rejectionReason && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Previous Rejection Reason
                  </dt>
                  <dd className="mt-1 text-sm text-red-600">
                    {kycData.rejectionReason}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Action Buttons */}
        {kycData?.status !== "APPROVED" && (
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={handleApprove}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Approve KYC
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reject KYC
            </button>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowRejectModal(false)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Reject KYC
                </h3>
                <div>
                  <label
                    htmlFor="rejectionReason"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Rejection Reason
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows="4"
                    className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleReject}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}