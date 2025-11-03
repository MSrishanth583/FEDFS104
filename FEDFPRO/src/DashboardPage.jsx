import React from "react";
import EventsTable from "./EventsTable";
import ParticipationSection from "./ParticipationSection";

function DashboardPage({ events, participation, onLogout, onRegister, onUnregister }) {
  const regCount = participation.filter(ev => ev.status === "registered").length;
  const attCount = participation.filter(ev => ev.status === "attended").length;
  const availCount = events.length;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dash-logo">
          <span className="icon">📖</span>
          <div>
            <div className="hub-title">Extracurricular Hub</div>
            <div className="hub-subtitle">Student Dashboard</div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>⮐ Logout</button>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-card events">
          <h2><span>📅</span> Upcoming Activities / Events</h2>
          <p className="light-desc">Discover and register for exciting extracurricular activities</p>
          <EventsTable
            events={events}
            participation={participation}
            onRegister={onRegister}
            onUnregister={onUnregister}
          />
        </section>

        <aside className="dashboard-sidebar">
          <section className="dashboard-card notifications">
            <h3>🔔 Notifications</h3>
            <div className="notification">New event: Drama Club Auditions on Oct 7th</div>
            <div className="notification">Reminder: Chess Club Tournament tomorrow at 3:00 PM</div>
            <div className="notification">Update: Football Match venue changed to Main Field</div>
          </section>

          <section className="dashboard-card stats" id="statsSection">
            <h3>Quick Stats</h3>
            <div className="stat-row"><div>Events Registered</div><div className="stat-number blue">{regCount}</div></div>
            <div className="stat-row"><div>Events Attended</div><div className="stat-number orange">{attCount}</div></div>
            <div className="stat-row"><div>Available Events</div><div className="stat-number blue">{availCount}</div></div>
          </section>
        </aside>
      </main>

      <ParticipationSection participation={participation} />
    </div>
  );
}

export default DashboardPage;
