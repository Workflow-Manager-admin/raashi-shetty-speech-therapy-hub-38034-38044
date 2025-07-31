import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SupabaseContext } from "../App";
import "./Auth.css";

// PUBLIC_INTERFACE
/** Authentication (Sign In/Up/OAuth) using Supabase. */
function Auth() {
  const { supabase, user, setUser } = useContext(SupabaseContext);
  const navigate = useNavigate();
  const [view, setView] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (user) {
    navigate("/profile");
    return null;
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      if (view === "sign-in") {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setUser(data.user);
        navigate("/profile");
      } else {
        const { error, data } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setUser(data.user);
        navigate("/profile");
      }
    } catch (err) {
      setErrorMsg(err.message || "Auth error");
    }
  };

  const handleOAuth = async () => {
    setErrorMsg("");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/profile" }
    });
    if (error) setErrorMsg(error.message);
    // The actual login will redirect.
  };

  return (
    <section className="auth-section">
      <h2>{view === "sign-in" ? "Sign In" : "Sign Up"}</h2>
      <form className="auth-form" onSubmit={handleAuth}>
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            autoComplete="username"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={password}
            autoComplete={view === "sign-in" ? "current-password" : "new-password"}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        {errorMsg && <div className="auth-error">{errorMsg}</div>}
        <button className="btn auth-btn" type="submit">{view === "sign-in" ? "Sign In" : "Sign Up"}</button>
        <button className="btn auth-oauth-btn" type="button" onClick={handleOAuth}>
          Sign in with Google
        </button>
      </form>
      <div className="auth-switch">
        {view === "sign-in"
          ? <span>Don't have an account? <button className="btn-link" onClick={() => setView("sign-up")}>Sign Up</button></span>
          : <span>Already have an account? <button className="btn-link" onClick={() => setView("sign-in")}>Sign In</button></span>
        }
      </div>
    </section>
  );
}

export default Auth;
