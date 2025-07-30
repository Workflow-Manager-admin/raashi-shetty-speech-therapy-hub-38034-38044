import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SupabaseContext, ThemeContext } from "../App";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const ADMIN_EMAILS = [
  "raashishetty.speech@gmail.com", // example, update with real admin emails
];
/**
 * PUBLIC_INTERFACE
 * Top navigation bar: luxury style with burger menu overlay, brand-only header, and accessible links.
 */
function Navbar() {
  const { user, setUser, supabase } = useContext(SupabaseContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Burger menu open/close state
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on nav action or Escape
  React.useEffect(() => {
    const onKeyDown = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    if (menuOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  // Menu items (luxury, clear, modern)
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About Raashi" },
    { to: "/videos", text: "Videos" },
    { to: "/book", text: "Book Appointment" },
    { to: "/subscribe", text: "Subscribe" },
    { to: "/testimonials", text: "Testimonials" },
    { to: "/questionnaire", text: "Questionnaire" },
    { to: "/ai-chat", text: "Ask AI" }
  ];

  if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
    navLinks.push({ to: "/admin", text: "Admin" });
  }

  return (
    <header className={`navbar luxury-navbar navbar-${theme}`}>
      <div className="navbar-brand">
        <Link to="/" className="logo">Speech Bridge</Link>
      </div>
      <button
        className="burger-icon"
        aria-label="Open navigation menu"
        aria-controls="site-menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <FaBars size={28} />
      </button>
      {/* Stylish slideover/overlay menu */}
      <nav
        className={`burger-menu-ol luxury-drawer-menu${menuOpen ? " open" : ""}`}
        id="site-menu"
        role="dialog"
        aria-modal="true"
      >
        <div className="burger-menu-content">
          <button
            className="burger-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes size={28} />
          </button>
          <ul className="burger-links">
            {navLinks.map(link => (
              <li key={link.text}>
                <Link
                  to={link.to}
                  className="burger-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link to="/profile" title="Profile" className="burger-link" onClick={() => setMenuOpen(false)}>
                    <FaUserCircle size={22} style={{ verticalAlign: "middle", marginRight: 8 }} /> My Profile
                  </Link>
                </li>
                <li>
                  <button className="btn burger-logout" onClick={handleLogout}>Log Out</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth" className="burger-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
              </li>
            )}
            <li>
              <button
                className="btn theme-toggle-burger"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Toggle theme"
              >
                {theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
              </button>
            </li>
          </ul>
        </div>
        {/* Click backdrop to close */}
        <div className="burger-backdrop" onClick={() => setMenuOpen(false)} tabIndex={-1} />
      </nav>
    </header>
  );
}

export default Navbar;
