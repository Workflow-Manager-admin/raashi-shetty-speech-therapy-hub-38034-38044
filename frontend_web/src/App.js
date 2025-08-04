import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AboutRaashi from "./components/AboutRaashi";
import VideosGallery from "./components/VideosGallery";
import Booking from "./components/Booking";
import Payments from "./components/Payments";
import Subscription from "./components/Subscription";
import Testimonials from "./components/Testimonials";
import Questionnaire from "./components/Questionnaire";
import AIChat from "./components/AIChat";
import Profile from "./components/Profile";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import SpeechMilestones from "./components/SpeechMilestones";
import "./App.css";
import "./components/Sidebar.css";
// Import global carousel styles for react-slick (to support VideosGallery carousel correctly)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// PUBLIC_INTERFACE
export const SupabaseContext = createContext(null);
 // PUBLIC_INTERFACE
export const ThemeContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * The main app component for Speech Therapy Hub.
 * - Provides theme and supabase context
 * - Sets up overall layout with navbar, footer, and routed content
 */
function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    // Supabase's onAuthStateChange keeps profile sync'd
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Router>
          <div className="App luxury-app-bg" style={{display:"flex", minHeight:"100vh"}}>
            <Sidebar />
            {/* Shift main content right on desktop, fill full width on mobile */}
            <div style={{
              flex: 1,
              marginLeft: "230px",
              minWidth: 0,
              minHeight: "100vh",
              display:"flex",
              flexDirection:"column"
            }}>
              <Navbar />
              <main className="main-content" style={{ flex: 1, minHeight: 0 }}>
                <Routes>
                  {/* Homepage: About (intro box) only, per new site organization */}
                  <Route
                    path="/"
                    element={
                      <>
                        <HeroSection />
                        {/* 
                          Force identical styling/layout for AboutRaashi block on both home and /about page. 
                          Propagate explicit margin and maxWidth for bulletproof consistency.
                        */}
                        <div
                          className="homepage-sections-lux"
                          style={{
                            margin: "3.6rem auto 2.1rem auto",
                            maxWidth: "1260px",
                            padding: "0 1rem"
                          }}
                        >
                          <section className="lux-block about-block">
                            <AboutRaashi />
                          </section>
                        </div>
                      </>
                    }
                  />
                  {/* Milestones: dedicated scrollable main page route */}
                  <Route
                    path="/milestones"
                    element={
                      <SpeechMilestones />
                    }
                  />
                  {/* Questionnaire now on third main page */}
                  <Route path="/questionnaire" element={
                    <section className="lux-block questionnaire-block" style={{margin: "2rem auto", maxWidth: 750}}>
                      <Questionnaire />
                    </section>
                  } />
                  {/* Everything else as before */}
                  <Route
                    path="/about"
                    element={
                      <div
                        className="homepage-sections-lux"
                        style={{
                          margin: "3.6rem auto 2.1rem auto",
                          maxWidth: "1260px",
                          padding: "0 1rem"
                        }}
                      >
                        <section className="lux-block about-block">
                          <AboutRaashi />
                        </section>
                      </div>
                    }
                  />
                  <Route path="/videos" element={<VideosGallery />} />
                  <Route path="/book" element={<Booking />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/subscribe" element={<Subscription />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/ai-chat" element={<AIChat />} />
                  <Route path="/profile" element={
                    <ProtectedRoute user={user}><Profile /></ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <AdminRoute user={user}><AdminDashboard /></AdminRoute>
                  } />
                  <Route path="/auth" element={<Auth />} />
                  {/* Default fallback */}
                  <Route path="*" element={<HeroSection />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </Router>
      </ThemeContext.Provider>
    </SupabaseContext.Provider>
  );
}

export default App;
