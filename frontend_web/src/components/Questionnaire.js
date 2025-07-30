import React, { useState } from "react";
import "./Questionnaire.css";

/**
 * PUBLIC_INTERFACE
 * Interactive parent questionnaire (demo, does not persist beyond submit msg). 
 * For future: integrate with Supabase (see AdminDashboard.js for db/table).
 */
export default function Questionnaire() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    childAge: "",
    concerns: "",
    email: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", childAge: "", concerns: "", email: "" });
  };

  return (
    <section className="questionnaire-section">
      <h2>Parent Questionnaire</h2>
      <p>
        Tell us about your child’s communication journey.<br />
        We’ll tailor information and resources for you.
      </p>
      {submitted && (
        <div className="questionnaire-success">
          Thank you for submitting! Raashi will reach out with resources and guidance.
        </div>
      )}
      <form className="questionnaire-form" onSubmit={handleSubmit}>
        <label>
          Your Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Parent's Name"
          />
        </label>
        <label>
          Child's Age
          <input
            name="childAge"
            value={form.childAge}
            onChange={handleChange}
            type="number"
            min="1"
            max="21"
            required
            placeholder="e.g., 5"
          />
        </label>
        <label>
          Main Concern
          <input
            name="concerns"
            value={form.concerns}
            onChange={handleChange}
            required
            placeholder="Describe briefly"
          />
        </label>
        <label>
          Email for reply
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@domain.com"
          />
        </label>
        <button className="btn questionnaire-btn" type="submit">Send</button>
      </form>
    </section>
  );
}
