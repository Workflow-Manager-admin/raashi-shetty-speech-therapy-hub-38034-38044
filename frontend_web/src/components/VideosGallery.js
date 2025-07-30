import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./VideosGallery.css";
// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// PUBLIC_INTERFACE
/**
 * Gallery section for therapy/awareness videos using react-slick carousel.
 * Loads video list from curated JSON and displays each in a slider.
 */
function VideosGallery() {
  const [videos, setVideos] = useState([]);

  // Load videos from curated JSON. Webpack resolves import.
  useEffect(() => {
    import("./speech_therapy_videos_curated.json").then(data => {
      setVideos(data.default || data);
    });
  }, []);

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

  return (
    <section className="videos-gallery">
      <h2>Awareness & Therapy Videos</h2>
      <div className="videos-carousel-wrapper">
        <Slider {...settings}>
          {videos.map((vid, idx) => (
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
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default VideosGallery;
