import React, { useContext } from "react";
import { SupabaseContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

// PUBLIC_INTERFACE
/** User profile and session overview. */
function Profile() {
  const { supabase, user, setUser } = useContext(SupabaseContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  if (!user) return (
    <section className="profile-section">
      <h2>Not Signed In</h2>
      <p><a href="/auth">Sign in</a> to view your profile.</p>
    </section>
  );

  return (
    <section className="profile-section">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <div><b>Email:</b> {user.email}</div>
        <div><b>User ID:</b> {user.id}</div>
        <div>
          <button className="btn profile-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
