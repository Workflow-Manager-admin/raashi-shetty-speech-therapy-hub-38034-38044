import React, { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "../App";
import "./AdminDashboard.css";

/**
 * PUBLIC_INTERFACE
 * Administrator dashboard UI for Raashi Shetty Speech Therapy Hub.
 * - Protected by admin email allow-list.
 * - Displays all appointments from Supabase (`appointments` table).
 * - Displays user queries if available (`questionnaires` table), else shows placeholder.
 * - Accessible only to authorized admins.
 */

// Set of allowed admin email addresses. MUST match AdminRoute.js.
const ADMIN_EMAILS = [
  "raashishetty.speech@gmail.com", // Add real admin emails
];

function AdminDashboard() {
  const { supabase, user } = useContext(SupabaseContext);

  const [appointments, setAppointments] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apptsError, setApptsError] = useState("");
  const [queriesError, setQueriesError] = useState("");

  // Fetch all appointments and user queries from Supabase.
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch all Appointments
      let apptsRes = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
      if (!apptsRes.error && Array.isArray(apptsRes.data)) {
        setAppointments(apptsRes.data);
        setApptsError("");
      } else {
        setAppointments([]);
        setApptsError(apptsRes.error?.message || "Could not load appointments");
      }

      // Try to fetch "questionnaires". If not present, queries stay empty, show placeholder below
      let queriesRes = await supabase.from("questionnaires").select("*").order("created_at", { ascending: false });
      if (!queriesRes.error && Array.isArray(queriesRes.data)) {
        setQueries(queriesRes.data);
        setQueriesError("");
      } else if (queriesRes.error?.message?.toLowerCase?.().includes("table") || queriesRes.error?.code === "42P01") {
        setQueries([]);
        setQueriesError("Table for user queries not found in Supabase.");
      } else {
        setQueries([]);
        setQueriesError(queriesRes.error?.message || "Could not load user queries");
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  // Update appointment status (optimistically update in UI)
  const handleStatus = async (id, status) => {
    await supabase.from("appointments").update({ status }).eq("id", id);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  // Protect page - Only allow if user is signed in AND on allow-list
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <div style={{ padding: "2rem", color: "#b8002e" }}>
        <strong>Access denied.</strong>
      </div>
    );
  }

  return (
    <section className="admin-dashboard-section">
      <h2>Admin Dashboard</h2>
      {loading ? (
        <div>Loading data...</div>
      ) : (
        <div>
          <div className="admin-section-block">
            <h3>Appointment Requests</h3>
            {apptsError && <div style={{ color: "#b8002e", marginBottom: "8px" }}>Error: {apptsError}</div>}
            {appointments.length === 0 && !apptsError && (
              <div>No appointments found.</div>
            )}
            {appointments.map((appt) => (
              <div key={appt.id} className="admin-appt-card">
                <b>Name:</b> {appt.name || "-"}<br />
                <b>Email:</b> {appt.email || "-"}<br />
                <b>Date:</b> {appt.preferredDate || "-"} <b>Time:</b> {appt.preferredTime || "-"}<br />
                <b>Msg:</b> {appt.message || "-"}<br />
                <b>Status:</b> {appt.status || "pending"}
                <br />
                <button
                  className="admin-action-btn"
                  onClick={() => handleStatus(appt.id, "accepted")}
                  disabled={appt.status === "accepted"}
                >
                  Accept
                </button>
                <button
                  className="admin-action-btn admin-cancel"
                  onClick={() => handleStatus(appt.id, "cancelled")}
                  disabled={appt.status === "cancelled"}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
          <div className="admin-section-block">
            <h3>User Queries</h3>
            {/* If queries table does not exist, show placeholder */}
            {queriesError && queriesError.toLocaleLowerCase().includes("not found") ? (
              <div>
                <em>
                  User queries feature is not yet enabled.
                  <br />
                  (Supabase table <strong>&quot;questionnaires&quot;</strong> not found. Future queries will appear here.)
                </em>
              </div>
            ) : queriesError ? (
              <div style={{ color: "#b8002e" }}>Error loading user queries: {queriesError}</div>
            ) : queries.length === 0 ? (
              <div>No queries found.</div>
            ) : (
              queries.map((q) => (
                <div key={q.id} className="admin-query-card">
                  <b>Name:</b> {q.name || "-"}
                  {q.childAge && <> (child age: {q.childAge})</>}
                  <br />
                  <b>Email:</b> {q.email || "-"}<br />
                  <b>Concerns:</b> {q.concerns || "-"}
                  <br />
                  {/* Response action (future): */}
                  <button className="admin-action-btn" disabled title="Reply via email">
                    Respond
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;
