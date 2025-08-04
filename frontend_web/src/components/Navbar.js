import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { SupabaseContext, ThemeContext } from "../App";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaStar,
  FaUserFriends,
  FaVideo,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaGift,
  FaSmile,
  FaMagic,
  FaRobot,
  FaKey,
  FaQuestionCircle,
  FaCommentAlt
} from "react-icons/fa";
import "./Navbar.css";

/*
  Child-friendly playful icons by route.
  - Home: speech bubble (FaCommentAlt)
  - Milestones: star (FaStar)
  - Questionnaire: question (FaQuestionCircle)
  - About: teacher (FaChalkboardTeacher)
  - Videos: video (FaVideo)
  - Book: calendar check (FaCalendarCheck)
  - Subscribe: gift (FaGift)
  - Testimonials: smile (FaSmile)
  - Ask AI: robot (FaRobot)
  - Admin: key (FaKey)
*/
const NAV_ICONS = {
  "/": <FaCommentAlt style={{ marginRight: 8, color: "#F6995C", verticalAlign: "middle" }}/>,
  "/milestones": <FaStar style={{ marginRight: 8, color: "#F6995C", verticalAlign: "middle" }}/>,
  "/questionnaire": <FaQuestionCircle style={{ marginRight: 8, color: "#2447A5", verticalAlign: "middle" }}/>,
  "/about": <FaChalkboardTeacher style={{ marginRight: 8, color: "#2447A5", verticalAlign: "middle" }}/>,
  "/videos": <FaVideo style={{ marginRight: 8, color: "#F6995C", verticalAlign: "middle" }}/>,
  "/book": <FaCalendarCheck style={{ marginRight: 8, color: "#2447A5", verticalAlign: "middle" }}/>,
  "/subscribe": <FaGift style={{ marginRight: 8, color: "#F6995C", verticalAlign: "middle" }}/>,
  "/testimonials": <FaSmile style={{ marginRight: 8, color: "#2447A5", verticalAlign: "middle" }}/>,
  "/ai-chat": <FaRobot style={{ marginRight: 8, color: "#F6995C", verticalAlign: "middle" }}/>,
  "/admin": <FaKey style={{ marginRight: 8, color: "#2447A5", verticalAlign: "middle" }}/>
};

const ADMIN_EMAILS = [
  "raashishetty.speech@gmail.com", // example, update with real admin emails
];
/**
 * PUBLIC_INTERFACE
 * Top navigation bar: elevated playful modern style, colorful gradient background, playful accent icons, prominent logo.
 */
function Navbar() {
  const { user, setUser, supabase } = useContext(SupabaseContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Menu items with revised order and navigation – main app flow is Home ➔ Milestones ➔ Questionnaire
  // Add playful icons and accent bubbles per nav item
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/milestones", text: "Milestones" },
    { to: "/questionnaire", text: "Questionnaire" },
    { to: "/about", text: "About Raashi" },
    { to: "/videos", text: "Videos" },
    { to: "/book", text: "Book Appointment" },
    { to: "/subscribe", text: "Subscribe" },
    { to: "/testimonials", text: "Testimonials" },
    { to: "/ai-chat", text: "Ask AI" }
    // Admin link dynamically below
  ];

  if (
    user &&
    user.email &&
    ADMIN_EMAILS.includes(user.email) &&
    !navLinks.some(l => l.to === "/admin")
  ) {
    navLinks.push({ to: "/admin", text: "Admin" });
  }

  return (
    <header className={`navbar luxury-navbar navbar-${theme}`}>
      {/* Logo with playful bubble icon and fun accent */}
      <div className="navbar-brand">
        <Link to="/" className="logo">
          {/* Icon bubble for child speech theme */}
          <span
            style={{
              display: "inline-block",
              borderRadius: "50%",
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #F6995C 22%, #D2E6FA 100%)",
              boxShadow: "0 2px 12px #f6995c19",
              marginRight: 11,
              verticalAlign: "middle",
              textAlign: "center",
              lineHeight: "36px"
            }}
            aria-hidden="true"
          >
            <FaCommentAlt style={{ color: "#2447A5", fontSize: 20, verticalAlign: "middle" }} />
          </span>
          <span className="logo-title">
            Speech <span className="brand-accent">Bridge</span>
          </span>
        </Link>
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
      {/* Playful, elegant menu overlay */}
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
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    "burger-link" + (isActive ||
                       (link.to !== "/" && location.pathname.startsWith(link.to)) ? " current-link" : "")
                  }
                  onClick={() => setMenuOpen(false)}
                  end={link.to === "/"}
                >
                  <span
                    className="navlink-icon"
                    aria-hidden="true"
                    style={{ display: "inline-block", minWidth: 16 }}
                  >
                    {(NAV_ICONS[link.to] || null)}
                  </span>
                  <span className="navlink-text">{link.text}</span>
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    title="Profile"
                    className={({ isActive }) => "burger-link" + (isActive ? " current-link" : "")}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserCircle size={22} style={{ verticalAlign: "middle", marginRight: 8 }} /> My Profile
                  </NavLink>
                </li>
                <li>
                  <button className="btn burger-logout" onClick={handleLogout}>Log Out</button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/auth" className={({ isActive }) => "burger-link" + (isActive ? " current-link" : "")} onClick={() => setMenuOpen(false)}>
                  Sign In
                </NavLink>
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
        <div className="burger-backdrop" onClick={() => setMenuOpen(false)} tabIndex={-1} />
      </nav>
    </header>
  );
}

export default Navbar;
