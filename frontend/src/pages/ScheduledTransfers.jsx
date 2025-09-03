import React from "react";
import "../ScheduledTransfers.css";

export default function ScheduledTransfers() {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Scheduled Transfers</h1>
            <p className="text-gray-500 mt-1">Manage your automated transfers</p>
          </div>
          <button className="gradient-btn text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4 sm:mt-0">
            New Scheduled Transfer
          </button>
        </div>

        {/* Table / Cards */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-6 text-sm font-medium text-gray-500">Next Run</th>
                  <th className="p-6 text-sm font-medium text-gray-500">From</th>
                  <th className="p-6 text-sm font-medium text-gray-500">To</th>
                  <th className="p-6 text-sm font-medium text-gray-500">Amount</th>
                  <th className="p-6 text-sm font-medium text-gray-500">Frequency</th>
                  <th className="p-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="p-6 text-sm font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* First Transfer */}
                <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-6 font-semibold text-gray-800">2025-09-01</td>
                  <td className="p-6 text-gray-600">Checking ••••1234</td>
                  <td className="p-6 text-gray-600">Savings ••••9910</td>
                  <td className="p-6 font-bold text-lg text-orange-500">$500.00</td>
                  <td className="p-6 text-gray-600 flex items-center">
                    <span className="material-icons text-gray-400 mr-2">calendar_today</span> Monthly
                  </td>
                  <td className="p-6">
                    <span className="status-pill status-active flex items-center">
                      <span className="material-icons text-sm mr-1 text-green-500">fiber_manual_record</span> Active
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">pause</span>
                        </button>
                        <span className="tooltip">Pause</span>
                      </div>
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">edit</span>
                        </button>
                        <span className="tooltip">Edit</span>
                      </div>
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">delete</span>
                        </button>
                        <span className="tooltip">Cancel</span>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Second Transfer */}
                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <td className="p-6 font-semibold text-gray-800">2025-09-15</td>
                  <td className="p-6 text-gray-600">Savings ••••9910</td>
                  <td className="p-6 text-gray-600">Investment ••••4567</td>
                  <td className="p-6 font-bold text-lg text-orange-500">$1,200.00</td>
                  <td className="p-6 text-gray-600 flex items-center">
                    <span className="material-icons text-gray-400 mr-2">calendar_today</span> Bi-weekly
                  </td>
                  <td className="p-6">
                    <span className="status-pill status-paused flex items-center">
                      <span className="material-icons text-sm mr-1 text-yellow-500">fiber_manual_record</span> Paused
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">play_arrow</span>
                        </button>
                        <span className="tooltip">Resume</span>
                      </div>
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">edit</span>
                        </button>
                        <span className="tooltip">Edit</span>
                      </div>
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">delete</span>
                        </button>
                        <span className="tooltip">Cancel</span>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Third Transfer */}
                <tr className="bg-white hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-6 font-semibold text-gray-800">2025-10-01</td>
                  <td className="p-6 text-gray-600">Checking ••••1234</td>
                  <td className="p-6 text-gray-600">Credit Card ••••8888</td>
                  <td className="p-6 font-bold text-lg text-orange-500">$250.00</td>
                  <td className="p-6 text-gray-600 flex items-center">
                    <span className="material-icons text-gray-400 mr-2">calendar_today</span> Monthly
                  </td>
                  <td className="p-6">
                    <span className="status-pill status-active flex items-center">
                      <span className="material-icons text-sm mr-1 text-green-500">fiber_manual_record</span> Active
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">pause</span>
                        </button>
                        <span className="tooltip">Pause</span>
                      </div>
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">edit</span>
                        </button>
                        <span className="tooltip">Edit</span>
                      </div>
                      <div className="action-icon">
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                          <span className="material-icons">delete</span>
                        </button>
                        <span className="tooltip">Cancel</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {/* First Transfer */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Next Run</p>
                  <p className="font-semibold text-gray-800">2025-09-01</p>
                </div>
                <span className="status-pill status-active flex items-center">
                  <span className="material-icons text-sm mr-1 text-green-500">fiber_manual_record</span> Active
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="text-gray-700">Checking ••••1234</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="text-gray-700">Savings ••••9910</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                <div className="font-bold text-xl text-orange-500">$500.00</div>
                <div className="flex items-center space-x-2">
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">pause</span>
                    </button>
                    <span className="tooltip">Pause</span>
                  </div>
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">edit</span>
                    </button>
                    <span className="tooltip">Edit</span>
                  </div>
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">delete</span>
                    </button>
                    <span className="tooltip">Cancel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Transfer */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Next Run</p>
                  <p className="font-semibold text-gray-800">2025-09-15</p>
                </div>
                <span className="status-pill status-paused flex items-center">
                  <span className="material-icons text-sm mr-1 text-yellow-500">fiber_manual_record</span> Paused
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="text-gray-700">Savings ••••9910</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="text-gray-700">Investment ••••4567</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                <div className="font-bold text-xl text-orange-500">$1,200.00</div>
                <div className="flex items-center space-x-2">
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">play_arrow</span>
                    </button>
                    <span className="tooltip">Resume</span>
                  </div>
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">edit</span>
                    </button>
                    <span className="tooltip">Edit</span>
                  </div>
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">delete</span>
                    </button>
                    <span className="tooltip">Cancel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Transfer */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Next Run</p>
                  <p className="font-semibold text-gray-800">2025-10-01</p>
                </div>
                <span className="status-pill status-active flex items-center">
                  <span className="material-icons text-sm mr-1 text-green-500">fiber_manual_record</span> Active
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="text-gray-700">Checking ••••1234</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="text-gray-700">Credit Card ••••8888</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                <div className="font-bold text-xl text-orange-500">$250.00</div>
                <div className="flex items-center space-x-2">
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">pause</span>
                    </button>
                    <span className="tooltip">Pause</span>
                  </div>
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">edit</span>
                    </button>
                    <span className="tooltip">Edit</span>
                  </div>
                  <div className="action-icon">
                    <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="material-icons">delete</span>
                    </button>
                    <span className="tooltip">Cancel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
