// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TwoFactor from "./pages/TwoFactor";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RegisterStep1 from "./pages/RegisterStep1";
import RegisterStep2 from "./pages/RegisterStep2";
import Dashboard from "./pages/Dashboard";
import TransferStep1 from "./pages/TransferStep1";
import TransferDetails from "./pages/TransferDetails";
import TransferReview from "./pages/TransferReview";
import TransferSuccess from "./pages/TransferSuccess";
import TransactionState from "./pages/TransactionState";
import ScheduledTransfers from "./pages/ScheduledTransfers"; 
import TransactionDispute from "./pages/TransactionDispute";
import AccountDetails from "./pages/AccountDetails";
import StatementsPage from "./pages/StatementsPage";
import AddBeneficiary from "./pages/AddBeneficiary";
import NotificationPreferences from "./pages/NotificationPreferences";
import ProfileSecurity from "./pages/ProfileSecurity";
import LimitPage from "./pages/LimitPage";
import ChatbotSupportPage from "./pages/ChatbotSupportPage";
import FaqPage from "./pages/FaqPage";
import KycStatus from "./pages/KycStatus";
import ChatHistoryPage from "./pages/ChatHistoryPage";
import LoansOverviewPage from "./pages/LoansOverviewPage";
import ApplyForLoanPage from "./pages/ApplyForLoanPage";
import ActiveSessions from "./pages/ActiveSessions";
import Unauthorized401 from "./pages/Unauthorized401";
import Forbidden403 from "./pages/Forbidden403";
import NotFound404 from "./pages/NotFound404";
import NotificationsPage from "./pages/NotificationsPage";













export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/two-factor" element={<TwoFactor />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register-step1" element={<RegisterStep1 />} />
        <Route path="/register-step2" element={<RegisterStep2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer-step1" element={<TransferStep1 />} />
        <Route path="/transfer-details" element={<TransferDetails />} />
        <Route path="/transfer-review" element={<TransferReview />} />
        <Route path="/transfer-success" element={<TransferSuccess />} />
        <Route path="/transaction-state" element={<TransactionState />} /> 
        <Route path="/scheduled-transfers" element={<ScheduledTransfers />} />
        <Route path="/transaction-dispute" element={<TransactionDispute />} />
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path="/statements" element={<StatementsPage />} />
        <Route path="/add-beneficiary" element={<AddBeneficiary />} />
        <Route path="/notifications" element={<NotificationPreferences />} />
        <Route path="/profile-security" element={<ProfileSecurity />} />
        <Route path="/limit" element={<LimitPage />} />
        <Route path="/chatbot-support" element={<ChatbotSupportPage />} />
        <Route path="/Faq" element={<FaqPage />} />
        <Route path="/kyc-status" element={<KycStatus />} />
        <Route path="/chat-history" element={<ChatHistoryPage />} />
        <Route path="/loans" element={<LoansOverviewPage />} />
        <Route path="/apply-loan" element={<ApplyForLoanPage />} />
        <Route path="/sessions" element={<ActiveSessions />} />
        <Route path="/unauthorized" element={<Unauthorized401 />} />
        <Route path="/forbidden" element={<Forbidden403 />} />
        <Route path="*" element={<NotFound404 />} />
        <Route path="/notifications-list" element={<NotificationsPage />} />







      </Routes>
    </Router>
  );
}

