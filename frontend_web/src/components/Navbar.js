import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SupabaseContext, ThemeContext } from "../App";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const ADMIN_EMAILS = [
  "raashishetty.speech@gmail.com", // example, update with real admin emails
];

// PUBLIC_INTERFACE
/** Top navigation bar, responsive and minimal. */
function Navbar() {
  const { user, setUser, supabase } = useContext(SupabaseContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className={`navbar navbar-${theme}`}>
      <div className="navbar-brand">
        <Link to="/" className="logo">Speech Bridge</Link>
      </div>
      <input type="checkbox" id="toggle-navbar" className="navbar-toggle" />
      <label htmlFor="toggle-navbar" className="navbar-toggle-label">&#9776;</label>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Raashi</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><Link to="/book">Book Appointment</Link></li>
        <li><Link to="/subscribe">Subscribe</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/questionnaire">Questionnaire</Link></li>
        <li><Link to="/ai-chat">Ask AI</Link></li>
        {/* Show admin link if user is admin */}
        {user && user.email && ADMIN_EMAILS.includes(user.email) && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        {user
          ? (
            <>
              <li>
                <Link to="/profile" title="Profile"><FaUserCircle size={20} /></Link>
              </li>
              <li>
                <button className="btn btn-link" onClick={handleLogout} aria-label="Log Out">Log Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth">Sign In</Link>
            </li>
          )
        }
        <li>
          <button className="btn btn-link" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
