import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "./VideosGallery.css";
import PaymentDialog from "./PaymentDialog";
import { SupabaseContext } from "../App";
// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import curatedVideos from "./speech_therapy_videos_curated.json";

/*
  Video Gallery component for Speech Bridge by Raashi Shetty

  This now directly supports integrated subscription to unlock premium video content.
  - Displays a curated selection of awareness/public videos (always free).
  - Shows premium/locked videos gated unless subscribed.
  - Inline subscription prompt appears above the gallery (with payment), visually cohesive.
  - Users subscribe/unlock access without leaving the page.
  - All subscription state is managed here using Supabase.
*/

/**
 * PUBLIC_INTERFACE
 * Curated therapy/awareness video gallery with premium unlock/paywall integration.
 * - Users can subscribe (with payment) within the page to access premium content.
 * - Non-subscribers see free samples; premium videos are visually blurred/locked.
 * - Subscription components and payment flow directly integrated.
 */
function VideosGallery() {
  const { supabase, user } = useContext(SupabaseContext);
  const [videos, setVideos] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [loadingSub, setLoadingSub] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formError, setFormError] = useState("");
  const [justSubscribed, setJustSubscribed] = useState(false);

  // Set your real subscription price here
  const SUBS_PRICE = 899;

  // Load curated videos JSON (edit speech_therapy_videos_curated.json to update selection)
  useEffect(() => {
    setVideos(curatedVideos);
  }, []);

  // Check subscription status for current user
  useEffect(() => {
    async function checkSubscription() {
      setLoadingSub(true);
      setSubscribed(false);
      setFormError("");
      setJustSubscribed(false);
      // Must be logged in
      if (!user) return setLoadingSub(false);
      try {
        // Query the subscribers table for this user and "active" state
        const { data, error } = await supabase
          .from("subscribers")
          .select("status")
          .eq("user_id", user.id)
          .eq("status", "active")
          .limit(1)
          .maybeSingle();
        setSubscribed(!!(data && data.status === "active"));
      } catch (err) {
        setFormError("Error checking subscription status.");
      }
      setLoadingSub(false);
    }
    checkSubscription();
    // Only re-run when user changes
    // eslint-disable-next-line
  }, [user]);

  // react-slick carousel options
  const settings = {
    dots: true,
    infinite: true,
    speed: 480,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        }
      }
    ]
  };

  // Helper to convert any YouTube watch URL to embed
  function getEmbedUrl(url) {
    // Handles both "watch?v=" and direct embed or share links
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      // Convert to embed
      return url.replace("/watch?v=", "/embed/");
    }
    if (url.includes("youtu.be/")) {
      // Convert youtu.be short link to embed
      const id = url.split("youtu.be/")[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url; // Assume already embeddable
  }

  // For demo: first 2 videos public, rest are premium; adjust this logic as needed.
  const PUBLIC_LIMIT = 2;
  const premiumStart = PUBLIC_LIMIT;
  const freeVideos = videos.slice(0, PUBLIC_LIMIT);
  const premiumVideos = videos.slice(PUBLIC_LIMIT);

  // Start subscription process
  function handleSubscribeClick() {
    setFormError("");
    setShowPayment(true);
    setJustSubscribed(false);
  }

  // Complete subscription and activate in DB (Supabase)
  async function handlePaymentSuccess(paymentInfo) {
    setShowPayment(false);
    setFormError("");
    try {
      if (user) {
        await supabase.from("subscribers").insert([
          {
            user_id: user.id,
            paid_amount: paymentInfo.amount,
            payment_ref: paymentInfo.txnId,
            subscribed_at: new Date().toISOString(),
            status: "active"
          }
        ]);
        setSubscribed(true);
        setJustSubscribed(true);
      }
    } catch (e) {
      setFormError("There was a problem activating your subscription. Please try again.");
    }
  }

  // Subscription info widget
  const renderSubscriptionPrompt = () => (
    <div
      style={{
        background: "#FFF3E1",
        borderRadius: 16,
        padding: "1.3rem 1.5rem",
        margin: "0 auto 2rem auto",
        maxWidth: 555,
        boxShadow: "0 1px 10px #F6995C33"
      }}
    >
      <h3 style={{ color: "#2447A5", marginBottom: 7, fontSize: "1.26rem", letterSpacing: 0.5 }}>Unlock All Speech Therapy Videos!</h3>
      <p style={{ color: "#282c34", marginBottom: "1.3rem" }}>
        Subscribe to access <b>all premium speech therapy video content</b> including exclusive webinars and advanced therapy tips.<br />Your subscription directly supports our mission to empower communication for all!
      </p>
      <button
        className="btn subscription-btn"
        style={{
          background: "linear-gradient(97deg, #2447A5 54%, #F6995C 100%)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.09rem",
          borderRadius: 18,
          padding: "0.68em 2.1em",
          marginBottom: "0.7rem"
        }}
        onClick={handleSubscribeClick}
        disabled={loadingSub || subscribed}
      >
        {loadingSub ? "Checking..." : `Pay & Subscribe (₹${SUBS_PRICE})`}
      </button>
      <PaymentDialog
        visible={showPayment}
        onClose={() => setShowPayment(false)}
        purpose="Subscription Payment"
        amount={SUBS_PRICE}
        onSuccess={handlePaymentSuccess}
      />
      <div style={{ color: "#2447A5", fontSize: "0.98rem", marginTop: 10 }}>
        {user
          ? <>Enjoy unlimited premium access after subscribing. <b>Already subscribed?</b> Refresh this page.</>
          : <>Please <a href="/auth">sign in</a> to subscribe.</>
        }
      </div>
    </div>
  );

  // Success state after subscribing
  const renderSuccess = () => (
    <div
      style={{
        background: "#D2E6FA",
        color: "#2447A5",
        border: "1px solid #2447A5",
        borderRadius: 12,
        padding: "1.1em 1.3em",
        margin: "0 auto 2rem auto",
        fontWeight: 700,
        maxWidth: 380,
        fontSize: "1.11rem"
      }}
    >
      🎉 Thank you for subscribing! You now have access to all video content.
    </div>
  );

  return (
    <section className="videos-gallery">
      <h2>Awareness & Therapy Videos</h2>
      {/* Integrated subscription prompt or success message */}
      {formError && (
        <div
          className="booking-form-error"
          style={{
            margin: "0 auto 1rem auto",
            maxWidth: 480,
            fontSize: "1.07rem"
          }}
        >
          {formError}
        </div>
      )}
      {subscribed && user ? renderSuccess()
        : renderSubscriptionPrompt()}
      {/* Carousel with public/free and gated/premium content */}
      <div className="videos-carousel-wrapper">
        <Slider {...settings}>
          {/* Render always open/free videos */}
          {freeVideos.map((vid, idx) => (
            <div key={idx} className="videos-carousel-slide">
              <div className="carousel-video-card">
                <div className="carousel-video-embed-container">
                  <iframe
                    title={vid.title}
                    src={getEmbedUrl(vid.url)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                    className="video-embed"
                  />
                </div>
                <h3>{vid.title}</h3>
                <p>{vid.description}</p>
                {/* Tag for non-premium */}
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 6,
                    color: "#fff",
                    background: "#2eae63",
                    borderRadius: 7,
                    fontSize: "0.97rem",
                    padding: "2px 13px",
                    marginBottom: 3
                  }}
                >Free Sample</span>
              </div>
            </div>
          ))}
          {/* Render premium/gated videos - locked unless subscribed */}
          {premiumVideos.map((vid, idx) => (
            <div key={PUBLIC_LIMIT + idx} className="videos-carousel-slide">
              <div className="carousel-video-card" style={subscribed ? {} : { position: "relative", opacity: 0.53, filter: "blur(1.2px)" }}>
                <div className="carousel-video-embed-container" style={subscribed ? {} : { pointerEvents: "none" }}>
                  <iframe
                    title={vid.title}
                    src={getEmbedUrl(vid.url)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                    className="video-embed"
                    tabIndex={subscribed ? 0 : -1}
                  />
                  {!subscribed && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(240,240,240,0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                        borderRadius: 16,
                        flexDirection: "column",
                        fontWeight: 700
                      }}
                    >
                      <span role="img" aria-label="lock" style={{ fontSize: 28, marginBottom: 7 }}>🔒</span>
                      <div style={{ color: "#2447A5", marginBottom: 5 }}>
                        <b>Premium Content</b>
                      </div>
                      <div style={{ color: "#F6995C", fontSize: "0.98em", marginBottom: 4 }}>Subscribe to unlock</div>
                      <button
                        className="btn"
                        style={{ background: "#F6995C", color: "#fff", borderRadius: 9, fontWeight: 700, marginTop: 7, fontSize: "0.96em" }}
                        onClick={handleSubscribeClick}
                        disabled={loadingSub}
                      >
                        {loadingSub ? "Checking..." : `Subscribe Now`}
                      </button>
                    </div>
                  )}
                </div>
                <h3>{vid.title}</h3>
                <p>{vid.description}</p>
                {!subscribed && (
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 8,
                      color: "#fff",
                      background: "#F6995C",
                      borderRadius: 7,
                      fontSize: "0.95rem",
                      padding: "2px 12px"
                    }}
                  >Premium</span>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default VideosGallery;
