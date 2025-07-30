import React from "react";
import "./Footer.css";

// PUBLIC_INTERFACE
/** Minimal responsive site footer. */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>&copy; {new Date().getFullYear()} Raashi Shetty | Speech Bridge</span>
        <span>Made with <span aria-label="love">❤️</span> to empower speech</span>
      </div>
    </footer>
  );
}

export default Footer;
