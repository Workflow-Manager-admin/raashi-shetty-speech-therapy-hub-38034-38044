import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SupabaseContext } from "../App";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

// Main navigation entries
const SIDEBAR_LINKS = [
  { to: "/about", text: "About Raashi" },
  { to: "/milestones", text: "Milestones" }, // Added milestones to sidebar navigation
  { to: "/videos", text: "Videos Gallery" },
  { to: "/book", text: "Book Appointment" },
  { to: "/payments", text: "Payments" },
  { to: "/subscribe", text: "Subscription" },
  { to: "/testimonials", text: "Testimonials" },
  { to: "/questionnaire", text: "Questionnaire" },
  { to: "/ai-chat", text: "AI Chat" },
  { to: "/profile", text: "User Profile" }
];

// PUBLIC_INTERFACE
/**
 * Responsive persistent left sidebar navigation for all major items.
 * - Stays fixed left on desktop, collapsible via hamburger button on mobile.
 * - Highlights active section, hides on mobile unless toggled.
 */
function Sidebar() {
  const { user } = useContext(SupabaseContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Don't render on certain full-width routes (optional)
  // Example: const hideOnRoutes = ["/auth", "/admin"];
  // if (hideOnRoutes.includes(location.pathname)) return null;

  // If user not signed in, disable "User Profile" link
  const finalLinks = SIDEBAR_LINKS.map(link =>
    link.to === "/profile" && !user
      ? { ...link, disabled: true }
      : link
  );

  return (
    <>
      {/* Hamburger Button (shown only on mobile) */}
      <button
        className="sidebar-hamburger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`sidebar-nav${open ? " open" : ""}`}>
        <div className="sidebar-title">
          <span role="img" aria-label="logo" style={{ marginRight: 8 }}>🗣️</span>{" "}
          <span>Speech Bridge</span>
        </div>
        <ul>
          {finalLinks.map(({ to, text, disabled }) => (
            <li key={to}>
              {disabled ? (
                <span className="sidebar-link disabled">{text}</span>
              ) : (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    "sidebar-link" +
                    (isActive ||
                      (to !== "/" && location.pathname.startsWith(to))
                      ? " active"
                      : "")
                  }
                  onClick={() => setOpen(false)}
                  end={to === "/"}
                >
                  {text}
                  {to === "/profile" && user && (
                    <FaUserCircle
                      size={18}
                      style={{ marginLeft: 6, verticalAlign: "middle" }}
                    />
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}

export default Sidebar;
