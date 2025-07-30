import React from "react";
import { Navigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Restricts access to child route if user not authenticated.
 * USAGE: <ProtectedRoute user={user}><Profile /></ProtectedRoute>
 */
function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}
export default ProtectedRoute;
