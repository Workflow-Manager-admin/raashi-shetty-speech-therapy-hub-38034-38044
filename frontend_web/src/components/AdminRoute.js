import React from "react";
import { Navigate } from "react-router-dom";

// Set of allowed admin email addresses. Update as needed.
const ADMIN_EMAILS = [
  "raashishetty.speech@gmail.com", // Add real admin emails here
];

// PUBLIC_INTERFACE
/**
 * Protects nested route/components so only allowed admin(s) can access.
 * @param {Object} props
 * @param {Object} props.user Authenticated user object (should have `email` field)
 * @param {JSX.Element} props.children Protected component(s)
 *
 * Usage:
 *   <AdminRoute user={user}><AdminDashboard /></AdminRoute>
 */
function AdminRoute({ user, children }) {
  if (!user) return <Navigate to="/auth" replace />;
  if (!user.email || !ADMIN_EMAILS.includes(user.email))
    return <Navigate to="/" replace />;
  return children;
}

export default AdminRoute;
