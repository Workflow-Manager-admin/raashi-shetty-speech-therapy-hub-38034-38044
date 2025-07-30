import React, { useContext, useEffect, useState } from "react";
import { SupabaseContext } from "../App";
import "./AdminDashboard.css";

// Set of allowed admin email addresses. Must match AdminRoute.js
const ADMIN_EMAILS = [
  "raashishetty.speech@gmail.com", // Add real admin emails
];

// PUBLIC_INTERFACE
/**
 * Admin dashboard (shows if user.email is in allow-list).
 * Admin can review new appointment requests and user queries.
 */
function AdminDashboard() {
  const { supabase, user } = useContext(SupabaseContext);

  const [appointments, setAppointments] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments (future: fetch only new/unhandled or all)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Get appointments from Supabase (table/column names must match)
      let { data: appts, error: apptError } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
      let { data: qdata, error: qerror } = await supabase.from("questionnaires").select("*").order("created_at", { ascending: false });

      if (!apptError && appts) setAppointments(appts);
      if (!qerror && qdata) setQueries(qdata);
      setLoading(false);
    };
    fetchData();
  }, [supabase]);

  const handleStatus = async (id, status) => {
    await supabase.from("appointments").update({ status }).eq("id", id);
    // Optimistically update UI
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

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
            {appointments.length === 0 && <div>No appointments found.</div>}
            {appointments.map((appt) => (
              <div key={appt.id} className="admin-appt-card">
                <b>Name:</b> {appt.name}<br />
                <b>Email:</b> {appt.email}<br />
                <b>Date:</b> {appt.preferredDate} <b>Time:</b> {appt.preferredTime}<br />
                <b>Msg:</b> {appt.message || "-"}<br />
                <b>Status:</b> {appt.status || "pending"}
                <br />
                <button className="admin-action-btn" onClick={() => handleStatus(appt.id, "accepted")}>Accept</button>
                <button className="admin-action-btn admin-cancel" onClick={() => handleStatus(appt.id, "cancelled")}>Cancel</button>
              </div>
            ))}
          </div>
          <div className="admin-section-block">
            <h3>User Queries</h3>
            {queries.length === 0 && <div>No queries found.</div>}
            {queries.map((q) => (
              <div key={q.id} className="admin-query-card">
                <b>Name:</b> {q.name} (child age: {q.childAge})<br />
                <b>Email:</b> {q.email}<br />
                <b>Concerns:</b> {q.concerns}
                <br />
                {/* Response action (future): */}
                <button className="admin-action-btn" disabled title="Reply via email">Respond</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;
