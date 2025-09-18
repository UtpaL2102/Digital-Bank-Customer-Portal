import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import AdminKycList from "../components/AdminKycList";
import AdminKycDetail from "../components/AdminKycDetail";
import AdminEmployeeList from "../components/AdminEmployeeList";
import AdminBranchList from "../components/AdminBranchList";
import AdminAuditLogs from "../components/AdminAuditLogs";
import AdminLimitRequests from "../components/AdminLimitRequests";
import { clearAuthTokens } from '../lib/authHelpers';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    clearAuthTokens();
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Header */}
      <div className="w-full bg-[#001BB7]">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">
            Admin — DigitalSecure
          </h1>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-icons text-xl">logout</span>
              <span>Logout</span>
            </div>
          </button>
        </header>
      </div>

      <div className="p-4 md:p-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav
            aria-label="Tabs"
            className="-mb-px flex space-x-8"
          >
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `whitespace-nowrap py-2 px-1 border-b-2 text-sm ${
                  isActive
                    ? "border-[#001BB7] font-bold text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`
              }
            >
              Employees
            </NavLink>
            <NavLink
              to="/admin/kyc"
              className={({ isActive }) =>
                `whitespace-nowrap py-2 px-1 border-b-2 text-sm ${
                  isActive
                    ? "border-[#001BB7] font-bold text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`
              }
            >
              KYC Management
            </NavLink>
            <NavLink
              to="/admin/branches"
              className={({ isActive }) =>
                `whitespace-nowrap py-2 px-1 border-b-2 text-sm ${
                  isActive
                    ? "border-[#001BB7] font-bold text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`
              }
            >
              Branches
            </NavLink>
            <NavLink
              to="/admin/audit"
              className={({ isActive }) =>
                `whitespace-nowrap py-2 px-1 border-b-2 text-sm ${
                  isActive
                    ? "border-[#001BB7] font-bold text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`
              }
            >
              Audit logs
            </NavLink>
            <NavLink
              to="/admin/limit-requests"
              className={({ isActive }) =>
                `whitespace-nowrap py-2 px-1 border-b-2 text-sm ${
                  isActive
                    ? "border-[#001BB7] font-bold text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`
              }
            >
              Limit Requests
            </NavLink>
          </nav>
        </div>

        <Routes>
          <Route path="" element={<AdminEmployeeList />} />
          <Route path="kyc" element={<AdminKycList />} />
          <Route path="kyc/:userId" element={<AdminKycDetail />} />
          <Route path="branches" element={<AdminBranchList />} />
          <Route path="audit" element={<AdminAuditLogs />} />
          <Route path="limit-requests" element={<AdminLimitRequests />} />
        </Routes>
      </div>
    </div>
  );
}
