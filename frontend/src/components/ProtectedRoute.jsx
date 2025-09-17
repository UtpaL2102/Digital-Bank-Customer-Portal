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
  
  // useEffect(() => {
  //   const validateAuth = async () => {
  //     const token = getAuthToken();
  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await api.auth.me(token);
  //       setUser(response.user);
  //     } catch (error) {
  //       if (error.message?.includes('401')) {
  //         clearAuthTokens();
  //       }
  //       // If we get a 403 and the error is about KYC, we still consider the user authenticated
  //       // but not verified
  //       if (error.message?.includes('KYC')) {
  //         setUser({ status: 'unverified', role: 'user' });
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   validateAuth();
  // }, []);

  useEffect(() => {
  const validateAuth = async () => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }

    // === read stored user defensively ===
    let parsed = null;
    try {
      const storedRaw = sessionStorage.getItem('user');
      console.debug('[ProtectedRoute] storedRaw:', storedRaw);
      if (storedRaw && storedRaw !== 'undefined' && storedRaw !== 'null') {
        parsed = JSON.parse(storedRaw);
      }
    } catch (e) {
      console.warn('[ProtectedRoute] failed to parse sessionStorage.user', e);
      sessionStorage.removeItem('user');
      parsed = null;
    }

    // If stored user is admin, use it and skip /me entirely (fast-path)
    if (parsed && parsed.role === 'admin') {
      console.debug('[ProtectedRoute] admin fast-path - skipping /me');
      setUser(parsed);
      setLoading(false);
      return;
    }

    // Otherwise call /me to validate token and refresh status
    try {
      const response = await api.auth.me(token);
      // If the backend returns { user: ... } or top-level user, handle both
      if (response?.user) {
        setUser(response.user);
      } else if (response && (response.role || response.id)) {
        setUser(response);
      } else {
        console.warn('[ProtectedRoute] unexpected /me shape:', response);
        setUser(null);
      }
    } catch (error) {
      console.error('validateAuth error', error);
      // If token invalid -> clear tokens
      if (error.status === 401 || (error.message && error.message.includes('401'))) {
        clearAuthTokens();
        setUser(null);
      }
      // If backend returned KYC 403 (and your handleResponse throws), treat as unverified
      else if (error.status === 403 || (error.message && error.message.includes('KYC'))) {
        setUser({ status: 'unverified', role: 'user' });
      } else {
        setUser(null);
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
  // Exempt admins from being forced to minimal-dashboard
    if (requireKycVerified && user?.role !== 'admin' && user?.status !== 'verified') {
      return <Navigate to="/minimal-dashboard" replace />;
    }

  return children;
}