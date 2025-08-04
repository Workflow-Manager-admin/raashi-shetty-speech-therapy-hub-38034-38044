import React from "react";
import "./AboutRaashi.css";

// PUBLIC_INTERFACE
/** Informational section about Raashi Shetty with premium, playful, and inviting intro and background. */
function AboutRaashi() {
  return (
    <section className="about-raashi">
      {/* Floating bubble/flair accents for playful, child-centric look */}
      <span className="about-float-bubble about-float-bubble-1" aria-hidden="true"></span>
      <span className="about-float-bubble about-float-bubble-2" aria-hidden="true"></span>
      <span className="about-float-bubble about-float-bubble-3" aria-hidden="true"></span>
      <div className="about-inner">
        <img
          src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80"
          alt="Professional portrait of Raashi Shetty, Speech Therapist (placeholder)"
          className="about-photo"
        />
        <div className="about-text">
          <h2>About Raashi Shetty</h2>
          <p>
            <strong>Raashi Shetty</strong> is a passionate, certified Speech Therapist, committed to empowering children and adults to find their voices and communicate with confidence.
            <br />
            <br />
            With extensive experience in speech and language therapy, Raashi helps bridge communication gaps for diverse needs. Her approach is client-focused, evidence-based, and filled with compassion.
            <br />
            <br />
            <b>Therapeutic Areas:</b><br />
            Speech delay, stuttering, articulation disorders, autism-related communication, voice therapy, and parent guidance.
            <br />
            <br />
            <b>Mission:</b> To foster growth, independence, and joy in speech for every person she works with.
          </p>
          <a href="/book" className="btn about-btn">Book an Appointment</a>
        </div>
      </div>
    </section>
  );
}

export default AboutRaashi;
