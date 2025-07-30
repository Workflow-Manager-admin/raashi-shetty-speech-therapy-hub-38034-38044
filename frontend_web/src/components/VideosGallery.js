import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { SupabaseContext } from "../App";
import "./VideosGallery.css";

// PUBLIC_INTERFACE
/** Gallery section for therapy/awareness videos. */
function VideosGallery() {
  // For demo purposes, video data is hard-coded. Connect to backend/Supabase for dynamic videos.
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Early Signs of Speech Delay",
      url: "https://www.youtube.com/embed/5qap5aO4i9A",
      desc: "Recognizing early signs for proactive therapy.",
    },
    {
      id: 2,
      title: "Articulation Exercises for Kids",
      url: "https://www.youtube.com/embed/LXb3EKWsInQ",
      desc: "Fun exercises to improve clarity.",
    },
    {
      id: 3,
      title: "Understanding Stuttering",
      url: "https://www.youtube.com/embed/Bey4XXJAqS8",
      desc: "What is stuttering, and how is it supported?",
    },
    {
      id: 4,
      title: "Parent Tips: Supporting Communication",
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      desc: "Guidelines for parents.",
    },
  ]);
  // Example for fetching videos from Supabase, if video table exists
  // const { supabase } = useContext(SupabaseContext);
  // useEffect(() => {
  //   supabase.from("videos").select("*").then(({ data }) => setVideos(data));
  // }, [supabase]);

  return (
    <section className="videos-gallery">
      <h2>Awareness & Therapy Videos</h2>
      <div className="videos-grid">
        {videos.map((vid) => (
          <div className="video-card" key={vid.id}>
            <iframe
              title={vid.title}
              src={vid.url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              className="video-embed"
            />
            <h3>{vid.title}</h3>
            <p>{vid.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VideosGallery;
