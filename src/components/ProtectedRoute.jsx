// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  // If the user is logged in, show the page they were trying to access.
  // The <Outlet /> component renders the actual page (e.g., CheckoutPage).
  if (user) {
    return <Outlet />;
  }

  // If the user is NOT logged in, redirect them to the login page.
  // We also save the page they were trying to visit (`location.pathname`)
  // so we can send them back there after they log in.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
