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
      // Validate response data
      if (!response) {
        throw new Error('Empty response from server');
      }
      // If the backend returns { user: ... } or top-level user, handle both
      if (response.user) {
        setUser(response.user);
      } else if (response.role || response.id) {
        setUser(response);
      } else {
        console.warn('[ProtectedRoute] unexpected /me shape:', response);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('validateAuth error', error);
      
      // Extract error message and status
      const errorMsg = error.message || '';
      const errorStatus = error.status || (errorMsg.includes('401') ? 401 : errorMsg.includes('403') ? 403 : null);

      // Handle different error cases
      if (errorStatus === 401 || errorMsg.includes('401')) {
        console.log('Clearing auth tokens due to 401');
        clearAuthTokens();
        setUser(null);
      }
      // If it's a KYC related error, keep the user logged in but mark as unverified
      else if (
        errorStatus === 403 || 
        errorMsg.includes('KYC') || 
        errorMsg.includes('verify')
      ) {
        console.log('Setting user as unverified due to KYC requirement');
        setUser({ status: 'unverified', role: 'user' });
      } 
      // For any other error, log out the user
      else {
        console.log('Setting user to null due to unexpected error');
        clearAuthTokens();
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
  // Exempt admins and users already on minimal-dashboard or kyc-status
  if (requireKycVerified && 
      user?.role !== 'admin' && 
      user?.status !== 'verified' && 
      !location.pathname.startsWith('/minimal-dashboard') && 
      !location.pathname.startsWith('/kyc-status')) {
    console.log('Redirecting unverified user to minimal dashboard');
    return <Navigate to="/minimal-dashboard" replace />;
  }

  return children;
}