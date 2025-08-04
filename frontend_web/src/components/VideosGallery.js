import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./VideosGallery.css";
// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import curatedVideos from "./speech_therapy_videos_curated.json";

/*
  Video Gallery component for Speech Bridge by Raashi Shetty

  - Displays a curated, real selection of current YouTube speech therapy and communication development videos.
  - No placeholder or irrelevant videos included.
  - Each video shows the embedded YouTube player, clear video title, and a short description.
  - Data is sourced from `speech_therapy_videos_curated.json` (make future updates there).
  - Modern, clean carousel UI styled per site brand colors.
*/

// PUBLIC_INTERFACE
/**
 * Curated therapy/awareness video gallery.
 * Shows ONLY real, relevant YouTube videos from a maintained JSON file.
 * Videos include title, embed, and short description as a modern carousel.
 */
function VideosGallery() {
  const [videos, setVideos] = useState([]);

  // Load curated videos JSON (edit speech_therapy_videos_curated.json to update selection)
  useEffect(() => {
    setVideos(curatedVideos);
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
