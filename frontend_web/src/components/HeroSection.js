import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

// PUBLIC_INTERFACE
/** Hero Section for landing page; welcoming & highlights CTAs */
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-bg" />
      <div className="hero-content">
        <h1>Welcome to Speech Bridge by Raashi Shetty</h1>
        <p>Empowering voices, building bridges! Video therapy, expert guidance, AI answers, and more.</p>
        <div className="hero-ctas">
          <Link to="/book" className="btn hero-btn">Book an Appointment</Link>
          <Link to="/videos" className="btn btn-secondary hero-btn">Watch Awareness Videos</Link>
          <Link to="/ai-chat" className="btn btn-tertiary hero-btn">Ask AI about Speech Therapy</Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
