import React, { useState } from "react";
import "./Payments.css";

/**
 * PUBLIC_INTERFACE
 * PaymentDialog: Modern modal/dialog for payment details entry, designed to match site brand.
 * To be embedded as a step in booking/subscription.
 * 
 * Props:
 * - visible: whether the modal is open
 * - amount: payment amount (number, Rs)
 * - purpose: string ("Booking Appointment" or "Subscription" etc)
 * - onClose(): called when cancelled or closed
 * - onSuccess(paymentInfo): called with payment details on successful paid
 *
 * For demo, this is a Stripe-like UI with only client-side card validation (NO actual payment).
 */
function PaymentDialog({ visible, amount, purpose, onClose, onSuccess }) {
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!visible) return null;

  function handleChange(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
  }

  function validate() {
    // Basic validations
    const { number, expiry, cvc, name } = card;
    if (!/^\d{16}$/.test(number.replace(/\s/g, ""))) return "Enter a valid 16-digit card number.";
    if (!/^(\d{2})\/(\d{2})$/.test(expiry)) return "Expiry must be in MM/YY format.";
    if (!/^\d{3}$/.test(cvc)) return "CVC should be 3 digits.";
    if (!name.trim()) return "Cardholder name required.";
    return "";
  }

  async function handlePay(e) {
    e.preventDefault();
    setError("");
    const errMsg = validate();
    if (errMsg) { setError(errMsg); return; }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess && onSuccess({
        card: { ...card, number: "XXXX-XXXX-XXXX-" + card.number.slice(-4) }, // Do not leak real card data
        amount,
        purpose,
        txnId: "demo-" + Date.now()
      });
    }, 1200); // Simulate processing
  }

  return (
    <div className="payments-modal-bg" tabIndex={-1}>
      <div className="payments-modal" role="dialog" aria-modal="true">
        <h2 style={{ color: "#2447A5", marginBottom: 3 }}>{purpose}</h2>
        <div style={{
          color: "#282c34", fontWeight: 600,
          marginBottom: 14, fontSize: "1.12rem"
        }}>
          Please complete payment to continue.
        </div>
        <form className="payments-form" onSubmit={handlePay}>
          <div className="payments-field">
            <label>
              <span>Card Number</span>
              <input
                name="number"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                required
                value={card.number}
                onChange={handleChange}
                disabled={processing}
              />
            </label>
          </div>
          <div className="payments-row" style={{ gap: 15 }}>
            <label>
              <span>Expiry (MM/YY)</span>
              <input
                name="expiry"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                maxLength={5}
                required
                value={card.expiry}
                onChange={handleChange}
                disabled={processing}
              />
            </label>
            <label>
              <span>CVC</span>
              <input
                name="cvc"
                type="password"
                autoComplete="cc-csc"
                inputMode="numeric"
                maxLength={3}
                required
                value={card.cvc}
                onChange={handleChange}
                disabled={processing}
              />
            </label>
          </div>
          <div className="payments-field">
            <label>
              <span>Cardholder Name</span>
              <input
                name="name"
                autoComplete="cc-name"
                placeholder="Name as on card"
                required
                value={card.name}
                onChange={handleChange}
                disabled={processing}
              />
            </label>
          </div>
          <div style={{
            marginTop: 8,
            marginBottom: 8,
            color: "#2447A5",
            fontSize: "1.13em"
          }}>
            <b>Amount: ₹{parseFloat(amount).toFixed(2)}</b>
          </div>
          {error && <div className="payments-form-error">{error}</div>}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 18 }}>
            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={processing}
              style={{
                background: "#ccc", color: "#333", borderRadius: 10, fontWeight: 700
              }}
            >
              Cancel
            </button>
            <button
              className="btn booking-btn"
              type="submit"
              style={{
                minWidth: 120, fontWeight: 700, fontSize: "1.02em"
              }}
              disabled={processing}
            >
              {processing ? "Processing..." : "Pay & Continue"}
            </button>
          </div>
        </form>
        <button
          aria-label="Close"
          className="payments-close-x"
          style={{
            position: "absolute", top: 14, right: 20,
            background: "transparent",
            border: "none", fontSize: 28, color: "#2447A5", cursor: "pointer"
          }}
          onClick={onClose}
          disabled={processing}
        >×</button>
      </div>
    </div>
  );
}

export default PaymentDialog;
