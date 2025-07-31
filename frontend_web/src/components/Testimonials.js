import React from "react";
import "./Testimonials.css";

// PUBLIC_INTERFACE
/** Testimonials carousel/grid module. */
function Testimonials() {
  const testimonials = [
    {
      author: "Parent of Aarav",
      content: "Raashi is a wonderful speech therapist! My son is now speaking confidently thanks to her gentle approach.",
    },
    {
      author: "Ritika, 28",
      content: "After voice therapy with Raashi, my stuttering has reduced so much. Highly recommend her services.",
    },
    {
      author: "Parent of Isha",
      content: "The video resources are so helpful and engaging. Thank you for supporting parents on this journey.",
    },
    {
      author: "Rahul, 16",
      content: "Sessions were fun and practical! I enjoyed working with Raashi as she made learning easy.",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2>Testimonials</h2>
      <div className="testimonials-grid">
        {testimonials.map((test, idx) => (
          <div className="testimonial-card" key={idx}>
            <p className="testimonial-content">"{test.content}"</p>
            <p className="testimonial-author">&#8212; {test.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
