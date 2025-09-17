// AUTH: added route protection - Protected route component with role and KYC checks
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken, clearAuthTokens } from '../lib/authHelpers';
import { api } from '../lib/api';

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  requireKycVerified = true 
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const validateAuth = async () => {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.auth.me(token);
        setUser(response.user);
      } catch (error) {
        if (error.message?.includes('401')) {
          clearAuthTokens();
        }
        // If we get a 403 and the error is about KYC, we still consider the user authenticated
        // but not verified
        if (error.message?.includes('KYC')) {
          setUser({ status: 'unverified', role: 'user' });
        }
      } finally {
        setLoading(false);
      }
    };

    validateAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const token = getAuthToken();
  if (!token) {
    // Save the attempted URL to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role requirements
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  // Check KYC verification if required
  if (requireKycVerified && user.status !== 'verified') {
    return <Navigate to="/minimal-dashboard" replace />;
  }

  return children;
}