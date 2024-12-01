import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const userRole = user?.roles?.[0]?.toLowerCase().replace('role_', '');
  const currentPath = location.pathname.split('/')[1];

  if (currentPath !== userRole && ['admin', 'faculty', 'student'].includes(currentPath)) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
