import React from "react";
import "./Payments.css";

// PUBLIC_INTERFACE
/** Payment page UI (can be extended for Stripe/Razorpay integration). */
function Payments() {
  return (
    <section className="payments-section">
      <h2>Online Payments</h2>
      <p>
        Securely pay for appointments or subscriptions.
        <br />
        <b>Payments integration is coming soon! For now, please complete your payment with Raashi via UPI or contact us for assistance.</b>
      </p>
      <div className="payments-placeholder">
        <span role="img" aria-label="credit card" style={{ fontSize: "2.4rem" }}>💳</span>
        <div>Stripe/Razorpay integration to be added here.</div>
      </div>
    </section>
  );
}

export default Payments;
