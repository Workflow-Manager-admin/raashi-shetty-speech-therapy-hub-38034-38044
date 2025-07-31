import React, { useState, useContext } from "react";
import { SupabaseContext } from "../App";
import "./Subscription.css";

// PUBLIC_INTERFACE
/** Subscribe to premium video gallery. */
function Subscription() {
  const { user } = useContext(SupabaseContext);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    // Simulate/record subscription, integrate with payments in real use.
    setSubscribed(true);
  };

  return (
    <section className="subscription-section">
      <h2>Subscribe for Full Video Content</h2>
      <p>
        Unlock access to our full library of speech therapy videos and exclusive webinar content.
      </p>
      {user ? (
        <>
          {subscribed ? (
            <div className="subscription-success">
              🎉 Thank you for subscribing! You now have access to all videos.
            </div>
          ) : (
            <>
              <button className="btn subscription-btn" onClick={handleSubscribe}>
                Subscribe Now (Coming soon)
              </button>
              <p style={{ fontSize: "0.97rem", color: "#2447A5" }}>
                Payments and access management coming soon!
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
