import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, isAuthenticated, adminOnly, isAdmin }) => {
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If the route is admin-only but the user is not an admin, redirect to the dashboard
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the component if all checks pass
  return <Component />;
};

export default ProtectedRoute;
