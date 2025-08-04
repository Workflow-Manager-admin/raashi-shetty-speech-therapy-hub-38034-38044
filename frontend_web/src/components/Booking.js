import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { SupabaseContext } from "../App";
import PaymentDialog from "./PaymentDialog";
import "./Booking.css";

// PUBLIC_INTERFACE
/**
 * Modern, accessible, and visually striking appointment booking form for Speech Bridge.
 * Features luxury card layout, clear feedback, mobile-first design, and friendly visual cues.
 */
function Booking() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const { supabase, user } = useContext(SupabaseContext);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [pendingForm, setPendingForm] = useState(null);

  // Set your real price here (in INR or as needed)
  const APPT_PRICE = 499;

  // Step 1: On submit booking details, show Payment Dialog instead of immediate submit
  const onSubmit = async (data) => {
    setFormError("");
    setPendingForm(data);
    setShowPayment(true);
  };

  // Step 2: Called AFTER payment success to finalize booking in DB
  const handlePaymentSuccess = async (paymentInfo) => {
    setShowPayment(false);
    try {
      // Insert appointment with payment data as well (optionally add payment ref)
      await supabase.from("appointments").insert([{ 
        ...pendingForm, 
        user_id: user?.id ?? null,
        payment_ref: paymentInfo.txnId,
        paid_amount: paymentInfo.amount
      }]);
      setSubmitted(true);
      reset();
    } catch (e) {
      setFormError("Something went wrong booking your appointment. Please try again.");
    } finally {
      setPendingForm(null);
    }
  };

  return (
    <section className="booking-section">
      <div className="booking-card-outer">
        <div className="booking-card-brand-accent" />
        <form className="booking-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off" spellCheck="false">
          <h2>
            <span role="img" aria-label="calendar" style={{ marginRight: 8, fontSize: "1.1em" }}>📅</span>
            Book Your Appointment
          </h2>
          <p className="booking-subtitle">
            Fill in your details to request a session with <span className="booking-highlight">Raashi Shetty</span>.
            <br />
            <span style={{ fontSize: "0.95em" }}>A confirmation will be emailed to you shortly.</span>
          </p>
          {formError && <div className="booking-form-error">{formError}</div>}
          {submitted && (
            <div className="booking-success">
              🎉 Thank you for booking! You'll receive a confirmation soon.
            </div>
          )}
          <div className="booking-fields">
            <label>
              <span>Your Name <span className="booking-required">*</span></span>
              <input
                {...register("name", { required: "Please enter your name." })}
                placeholder="Full Name"
                aria-invalid={!!errors.name}
                className={errors.name ? "booking-err" : ""}
              />
              {errors.name && <span className="booking-field-error">{errors.name.message}</span>}
            </label>
            <label>
              <span>Email <span className="booking-required">*</span></span>
              <input
                type="email"
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Enter a valid email.",
                  }
                })}
                placeholder="you@email.com"
                aria-invalid={!!errors.email}
                className={errors.email ? "booking-err" : ""}
              />
              {errors.email && <span className="booking-field-error">{errors.email.message}</span>}
            </label>
            <div className="booking-row">
              <label>
                <span>Preferred Date <span className="booking-required">*</span></span>
                <input
                  type="date"
                  {...register("preferredDate", { required: "Pick a date for the appointment." })}
                  aria-invalid={!!errors.preferredDate}
                  className={errors.preferredDate ? "booking-err" : ""}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.preferredDate && <span className="booking-field-error">{errors.preferredDate.message}</span>}
              </label>
              <label>
                <span>Preferred Time <span className="booking-required">*</span></span>
                <input
                  type="time"
                  {...register("preferredTime", { required: "Please select a time slot." })}
                  aria-invalid={!!errors.preferredTime}
                  className={errors.preferredTime ? "booking-err" : ""}
                />
                {errors.preferredTime && <span className="booking-field-error">{errors.preferredTime.message}</span>}
              </label>
            </div>
            <label>
              <span>Message to Therapist <span className="booking-optional">(optional)</span></span>
              <textarea
                {...register("message")}
                placeholder="Describe your concern or any questions"
                rows={3}
              />
            </label>
          </div>
          <button className="btn booking-btn" type="submit" disabled={isSubmitting || submitted}>
            {isSubmitting ? "Booking..." : `Pay & Book (₹${APPT_PRICE})`}
          </button>
        </form>
        <PaymentDialog
          visible={showPayment}
          onClose={() => setShowPayment(false)}
          purpose="Appointment Booking Payment"
          amount={APPT_PRICE}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </section>
  );
}

export default Booking;
