// AUTH: added route protection - Route configuration with auth guards
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
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
import MinimalDashboard from "./pages/MinimalDashboard";
import VerifyAccount from "./pages/VerifyAccount";
import AdminDashboard from "./pages/AdminDashboard";
import TwoFactorSetup from "./pages/TwoFactorSetup";









export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<RegisterStep1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/two-factor" element={<TwoFactor />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register-step1" element={<RegisterStep1 />} />
        <Route path="/unauthorized" element={<Unauthorized401 />} />
        <Route path="/forbidden" element={<Forbidden403 />} />
        <Route path="*" element={<NotFound404 />} />

        {/* KYC routes - protected but don't require KYC verification */}
        <Route path="/register-step2" element={
          <ProtectedRoute requireKycVerified={false}>
            <RegisterStep2 />
          </ProtectedRoute>
        } />
        <Route path="/kyc-status" element={
          <ProtectedRoute requireKycVerified={false}>
            <KycStatus />
          </ProtectedRoute>
        } />
        <Route path="/verify-account" element={
          <ProtectedRoute requireKycVerified={false}>
            <VerifyAccount />
          </ProtectedRoute>
        } />

        {/* Protected routes - require authentication and KYC verification */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/minimal-dashboard" element={
          <ProtectedRoute requireKycVerified={false}>
            <MinimalDashboard />
          </ProtectedRoute>
        } />
        <Route path="/transfer-step1" element={
          <ProtectedRoute>
            <TransferStep1 />
          </ProtectedRoute>
        } />
        <Route path="/transfer-details" element={
          <ProtectedRoute>
            <TransferDetails />
          </ProtectedRoute>
        } />
        <Route path="/transfer-review" element={
          <ProtectedRoute>
            <TransferReview />
          </ProtectedRoute>
        } />
        <Route path="/transfer-success" element={
          <ProtectedRoute>
            <TransferSuccess />
          </ProtectedRoute>
        } />
        <Route path="/transaction-state" element={
          <ProtectedRoute>
            <TransactionState />
          </ProtectedRoute>
        } />
        <Route path="/scheduled-transfers" element={
          <ProtectedRoute>
            <ScheduledTransfers />
          </ProtectedRoute>
        } />
        <Route path="/transaction-dispute" element={
          <ProtectedRoute>
            <TransactionDispute />
          </ProtectedRoute>
        } />
        <Route path="/account-details" element={
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>
        } />
        <Route path="/statements" element={
          <ProtectedRoute>
            <StatementsPage />
          </ProtectedRoute>
        } />
        <Route path="/add-beneficiary" element={
          <ProtectedRoute>
            <AddBeneficiary />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationPreferences />
          </ProtectedRoute>
        } />
        <Route path="/profile-security" element={
          <ProtectedRoute>
            <ProfileSecurity />
          </ProtectedRoute>
        } />
        <Route path="/limit" element={
          <ProtectedRoute>
            <LimitPage />
          </ProtectedRoute>
        } />
        <Route path="/chatbot-support" element={
          <ProtectedRoute>
            <ChatbotSupportPage />
          </ProtectedRoute>
        } />
        <Route path="/Faq" element={
          <ProtectedRoute>
            <FaqPage />
          </ProtectedRoute>
        } />
        <Route path="/chat-history" element={
          <ProtectedRoute>
            <ChatHistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/loans" element={
          <ProtectedRoute>
            <LoansOverviewPage />
          </ProtectedRoute>
        } />
        <Route path="/apply-loan" element={
          <ProtectedRoute>
            <ApplyForLoanPage />
          </ProtectedRoute>
        } />
        <Route path="/sessions" element={
          <ProtectedRoute>
            <ActiveSessions />
          </ProtectedRoute>
        } />
        <Route path="/notifications-list" element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } />
        <Route path="/two-factor-setup" element={
          <ProtectedRoute>
            <TwoFactorSetup />
          </ProtectedRoute>
        } />

        {/* Admin routes - require admin role */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />






      </Routes>
    </Router>
  );
}

