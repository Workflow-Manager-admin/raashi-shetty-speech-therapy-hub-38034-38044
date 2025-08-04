import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SupabaseContext } from "../App";
// Thematic playful section icons:
import {
  FaHome,
  FaChalkboardTeacher,
  FaStar,
  FaVideo,
  FaCalendarCheck,
  FaCreditCard,
  FaGift,
  FaSmile,
  FaQuestionCircle,
  FaRobot,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Sidebar.css";

// PUBLIC_INTERFACE
/**
 * Sidebar link definitions with playful icons matching main nav theme.
 */
const SIDEBAR_LINKS = [
  { to: "/", text: "Home", icon: <FaHome color="#F6995C" /> },
  { to: "/about", text: "About Raashi", icon: <FaChalkboardTeacher color="#2447A5" /> },
  { to: "/milestones", text: "Milestones", icon: <FaStar color="#F6995C" /> },
  { to: "/videos", text: "Videos Gallery", icon: <FaVideo color="#2447A5" /> },
  { to: "/book", text: "Book Appointment", icon: <FaCalendarCheck color="#F6995C" /> },
  { to: "/payments", text: "Payments", icon: <FaCreditCard color="#2447A5" /> },
  { to: "/subscribe", text: "Subscription", icon: <FaGift color="#F6995C" /> },
  { to: "/testimonials", text: "Testimonials", icon: <FaSmile color="#2447A5" /> },
  { to: "/questionnaire", text: "Questionnaire", icon: <FaQuestionCircle color="#F6995C" /> },
  { to: "/ai-chat", text: "AI Chat", icon: <FaRobot color="#2447A5" /> },
  { to: "/profile", text: "User Profile", icon: <FaUserCircle color="#F6995C" /> },
];

// PUBLIC_INTERFACE
/**
 * Enhanced, modern left sidebar navigation (cheerful, playful theme).
 * - Fixed on desktop, animated drawer on mobile.
 * - Colorful, rounded, with themed icons and hover/focus effects.
 * - Fully responsive and accessible.
 */
function Sidebar() {
  const { user } = useContext(SupabaseContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // If user not signed in, disable "User Profile" link
  const finalLinks = SIDEBAR_LINKS.map(link =>
    link.to === "/profile" && !user
      ? { ...link, disabled: true }
      : link
  );

  // Accessible ARIA labeling for nav
  return (
    <>
      {/* Hamburger Button (shown only on mobile) */}
      <button
        className="sidebar-hamburger"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="sidebar-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <nav
        className={`sidebar-nav${open ? " open" : ""}`}
        id="sidebar-nav"
        aria-label="Primary site navigation"
        tabIndex={-1}
      >
        {/* Sidebar fun title bubble */}
        <div className="sidebar-title">
          <span
            style={{
              display: "inline-block",
              borderRadius: "50%",
              width: 32,
              height: 32,
              marginRight: 10,
              background: "linear-gradient(135deg, #F6995C 36%, #D2E6FA 100%)",
              boxShadow: "0 2px 10px #f6995c19",
              textAlign: "center",
              lineHeight: "34px",
              verticalAlign: "middle"
            }}
            aria-hidden="true"
          >
            <FaRobot style={{ color: "#2447A5", fontSize: 18, verticalAlign: "middle" }} />
          </span>
          <span style={{ fontWeight: 800, letterSpacing: "0.021em" }}>
            Speech <span style={{ color: "#F6995C" }}>Bridge</span>
          </span>
        </div>
        <ul>
          {finalLinks.map(({ to, text, icon, disabled }) => (
            <li key={to}>
              {disabled ? (
                <span className="sidebar-link disabled" tabIndex={-1} aria-disabled="true">
                  <span className="sidebar-link-icon">{icon}</span>{text}
                </span>
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
                  aria-current={
                    location.pathname === to ||
                    (to !== "/" && location.pathname.startsWith(to))
                      ? "page" : undefined
                  }
                >
                  <span className="sidebar-link-icon">{icon}</span>
                  <span className="sidebar-link-text">{text}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* Mobile: overlay backdrop for navigation drawer */}
      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} tabIndex={-1} />}
    </>
  );
}

export default Sidebar;
