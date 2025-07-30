import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./components/Navbar";
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
import "./App.css";

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
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/about" element={<AboutRaashi />} />
                <Route path="/videos" element={<VideosGallery />} />
                <Route path="/book" element={<Booking />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/subscribe" element={<Subscription />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
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
        </Router>
      </ThemeContext.Provider>
    </SupabaseContext.Provider>
  );
}

export default App;
