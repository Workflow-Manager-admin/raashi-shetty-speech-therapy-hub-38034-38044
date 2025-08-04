import React, { useState, useContext } from "react";
import { SupabaseContext } from "../App";
import PaymentDialog from "./PaymentDialog";
import "./Subscription.css";

// PUBLIC_INTERFACE
/** Subscribe to premium video gallery. */
function Subscription() {
  const { supabase, user } = useContext(SupabaseContext);
  const [subscribed, setSubscribed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formError, setFormError] = useState("");

  // Set your real subscription price here
  const SUBS_PRICE = 899;

  // Step 1: Ask for payment, then mark user as subscribed
  const handleSubscribe = () => {
    setFormError("");
    setShowPayment(true);
  };

  // Step 2: Called on payment completion
  const handlePaymentSuccess = async (paymentInfo) => {
    setShowPayment(false);
    try {
      // Record subscriber in DB with payment ref (if not demo only)
      if (user) {
        await supabase.from("subscribers").insert([{
          user_id: user.id,
          paid_amount: paymentInfo.amount,
          payment_ref: paymentInfo.txnId,
          subscribed_at: new Date().toISOString(),
          status: "active"
        }]);
      }
      setSubscribed(true);
    } catch (e) {
      setFormError("There was a problem activating your subscription. Please try again.");
    }
  };

  return (
    <section className="subscription-section">
      <h2>Subscribe for Full Video Content</h2>
      <p>
        Unlock access to our full library of speech therapy videos and exclusive webinar content.
      </p>
      {formError && <div className="booking-form-error">{formError}</div>}
      {user ? (
        <>
          {subscribed ? (
            <div className="subscription-success">
              🎉 Thank you for subscribing! You now have access to all videos.
            </div>
          ) : (
            <>
              <button className="btn subscription-btn" onClick={handleSubscribe}>
                Pay & Subscribe (₹{SUBS_PRICE})
              </button>
              <PaymentDialog
                visible={showPayment}
                onClose={() => setShowPayment(false)}
                purpose="Subscription Payment"
                amount={SUBS_PRICE}
                onSuccess={handlePaymentSuccess}
              />
              <p style={{ fontSize: "0.97rem", color: "#2447A5" }}>
                Enjoy unlimited premium access after successful payment!
              </p>
            </>
          )}
        </>
      ) : (
        <div>
          <span>Please <a href="/auth">sign in</a> to subscribe.</span>
        </div>
      )}
    </section>
  );
}

export default Subscription;
