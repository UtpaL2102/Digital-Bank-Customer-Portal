import React, { useState } from "react";
import "../TransactionDispute.css";

export default function TransactionDispute() {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    console.log("Files dropped:", e.dataTransfer.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted!");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 border-b pb-4">
            Report a transaction
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Main Form */}
          <main className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Dispute details
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="transaction-reference"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Transaction reference
                    </label>
                    <input
                      id="transaction-reference"
                      name="transaction-reference"
                      type="text"
                      className="form-input w-full px-4 py-3 rounded-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="account"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Account
                    </label>
                    <input
                      id="account"
                      name="account"
                      type="text"
                      className="form-input w-full px-4 py-3 rounded-full bg-gray-50"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Reason
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    className="form-input w-full px-4 py-3 rounded-full bg-gray-50 appearance-none bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27 fill=%27none%27 stroke=%27%239CA3AF%27 stroke-width=%271.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpath d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option>Unauthorized charge</option>
                    <option>Incorrect amount</option>
                    <option>Item not received</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="form-input w-full px-4 py-3 rounded-2xl bg-gray-50"
                  ></textarea>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="attachments"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Attachments (optional)
                  </label>
                  <div
                    className={`file-upload-area flex flex-col items-center justify-center p-8 rounded-lg text-center cursor-pointer ${
                      dragOver ? "dragover" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <span className="material-icons text-gray-400 text-4xl mb-2">
                      cloud_upload
                    </span>
                    <p className="text-gray-500">
                      Drop receipts or{" "}
                      <span className="text-blue-600 font-medium">
                        click to upload
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="submit-button w-full md:w-auto text-white font-semibold py-3 px-8 rounded-full shadow-lg"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-blue-50 bg-opacity-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <span className="material-icons text-blue-600 mr-3">info</span>
                <h3 className="text-lg font-semibold text-gray-800">Guidelines</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Report within 60 days of statement.</li>
                <li>We'll notify you of updates.</li>
                <li>Temporary credit may apply.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
