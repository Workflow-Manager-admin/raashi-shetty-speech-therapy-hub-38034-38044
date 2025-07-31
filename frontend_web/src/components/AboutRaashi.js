import React from "react";
import "./AboutRaashi.css";

// PUBLIC_INTERFACE
/** Informational section about Raashi Shetty */
function AboutRaashi() {
  return (
    <section className="about-raashi">
      <div className="about-inner">
        <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=face&w=320&q=80" alt="Raashi Shetty Portrait" className="about-photo" />
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
