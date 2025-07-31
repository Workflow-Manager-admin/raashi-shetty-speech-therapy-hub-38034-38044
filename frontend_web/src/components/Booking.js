import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { SupabaseContext } from "../App";
import "./Booking.css";

// PUBLIC_INTERFACE
/** Booking form for appointments (demo, can be connected to backend calendar/supabase for real use) */
function Booking() {
  const { register, handleSubmit, reset } = useForm();
  const { supabase, user } = useContext(SupabaseContext);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    // Save appointment request; in real scenario, integrate with real calendar/notify therapist
    await supabase.from("appointments").insert([{ ...data, user_id: user?.id ?? null }]);
    setSubmitted(true);
    reset();
  };

  return (
    <section className="booking-section">
      <h2>Book an Appointment</h2>
      <p>
        Fill in your details to request a session with Raashi Shetty. A confirmation will be sent to your email.
      </p>
      {submitted && (
        <div className="booking-success">
          🎉 Thank you for booking! You'll receive a confirmation soon.
        </div>
      )}
      <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Your Name
          <input {...register("name", { required: true })} placeholder="Full Name" />
        </label>
        <label>
          Email
          <input type="email" {...register("email", { required: true })} placeholder="Email" />
        </label>
        <label>
          Preferred Date
          <input type="date" {...register("preferredDate", { required: true })} />
        </label>
        <label>
          Preferred Time
          <input type="time" {...register("preferredTime", { required: true })} />
        </label>
        <label>
          Message to Therapist (optional)
          <textarea {...register("message")} placeholder="Describe your concern or any questions" />
        </label>
        <button className="btn booking-btn" type="submit">Book Appointment</button>
      </form>
    </section>
  );
}

export default Booking;
