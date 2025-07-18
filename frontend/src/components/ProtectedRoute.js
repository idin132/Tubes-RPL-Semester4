import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  // allow multiple roles too
  const allowed = Array.isArray(allowedRoles)
    ? allowedRoles.includes(user.role)
    : user.role === allowedRoles;

  if (!allowed) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};


export default ProtectedRoute;
