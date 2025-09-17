import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import AdminKycList from "../components/AdminKycList";
import AdminKycDetail from "../components/AdminKycDetail";

export default function AdminDashboard() {
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Header */}
      <div className="w-full bg-[#001BB7]">
        <header className="p-4">
          <h1 className="text-xl font-semibold text-white">
            Admin — DigitalSecure
          </h1>
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
          </nav>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Employees</h2>
                  <button className="bg-gradient-to-r from-[#001BB7] to-[#0046FF] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    Add
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Name</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Email</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Branch</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Role</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 bg-white">
                        <td className="py-4 px-4 text-gray-900 font-medium">Priya Singh</td>
                        <td className="py-4 px-4 text-gray-600">priya@bank.com</td>
                        <td className="py-4 px-4 text-gray-600">001</td>
                        <td className="py-4 px-4 text-gray-600">Manager</td>
                        <td className="py-4 px-4 text-sm">
                          <button className="text-gray-600 hover:text-[#0046FF] hover:underline">Edit</button>
                          <span className="text-gray-300 mx-1">•</span>
                          <button className="text-gray-600 hover:text-[#0046FF] hover:underline">Remove</button>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-4 px-4 text-gray-900 font-medium">Omar Ali</td>
                        <td className="py-4 px-4 text-gray-600">omar@bank.com</td>
                        <td className="py-4 px-4 text-gray-600">003</td>
                        <td className="py-4 px-4 text-gray-600">Teller</td>
                        <td className="py-4 px-4 text-sm">
                          <button className="text-gray-600 hover:text-[#0046FF] hover:underline">Edit</button>
                          <span className="text-gray-300 mx-1">•</span>
                          <button className="text-gray-600 hover:text-[#0046FF] hover:underline">Remove</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />

          <Route path="/kyc" element={<AdminKycList />} />
          <Route path="/kyc/:userId" element={<AdminKycDetail />} />

          <Route
            path="/branches"
            element={
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Branches</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Code</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Name</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 px-4 text-gray-600">001</td>
                        <td className="py-4 px-4 text-gray-900 font-medium">Main</td>
                        <td className="py-4 px-4 text-gray-600">City Center</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 text-gray-600">003</td>
                        <td className="py-4 px-4 text-gray-900 font-medium">North</td>
                        <td className="py-4 px-4 text-gray-600">Hill Road</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />

          <Route
            path="/audit"
            element={
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Audit logs</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="User / Action / Date"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0046FF] focus:border-transparent transition-colors"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Time</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">User</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Action</th>
                        <th className="py-3 px-4 font-medium text-gray-500 text-sm">Ref</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">2023-08-10 12:02</td>
                        <td className="py-4 px-4 text-gray-900 font-medium">alex</td>
                        <td className="py-4 px-4 text-gray-600">
                          <span className="bg-[#FF8040]/20 text-[#FF8040] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                            TRANSFER_CREATE
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">TRX-22481</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">2023-08-10 12:05</td>
                        <td className="py-4 px-4 text-gray-900 font-medium">alex</td>
                        <td className="py-4 px-4 text-gray-600">LOGIN</td>
                        <td className="py-4 px-4 text-gray-600">OK</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
