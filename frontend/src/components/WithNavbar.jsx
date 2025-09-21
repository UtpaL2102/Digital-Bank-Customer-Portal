import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

// List of paths where navbar should not be shown
const excludedPaths = [
  '/dashboard',
  '/admin-dashboard',
  '/login',
  '/register',
  '/register-step2',
  '/'
];

export default function WithNavbar(WrappedComponent) {
  return function WithNavbarComponent(props) {
    const location = useLocation();
    const shouldShowNavbar = !excludedPaths.includes(location.pathname);

    return (
      <>
        {shouldShowNavbar && <Navbar />}
        <WrappedComponent {...props} />
      </>
    );
  };
}