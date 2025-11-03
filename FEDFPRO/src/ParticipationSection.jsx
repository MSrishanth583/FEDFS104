import React from "react";

function ParticipationSection({ participation }) {
  // Registered at top, then attended
  const sorted = [...participation].sort((a, b) => a.status.localeCompare(b.status));
  return (
    <section className="dashboard-card participation-section" id="participationSection">
      <h2>
        <span style={{ fontSize: "1.3em" }}>👥</span> My Participation
      </h2>
      <p className="light-desc">Track your registered and attended events</p>
      <div className="participation-list" id="participationList">
        {sorted.map(ev => {
          const badgeLabel = ev.status === "attended" ? "Attended" : "Registered";
          const badgeClass = ev.status === "attended" ? "attended" : "registered";
          return (
            <div className="participation-item" key={ev.id}>
              <div>
                <div className="event-title">{ev.name}</div>
                <div className="event-date">{ev.date}</div>
              </div>
              <span className={`status-badge ${badgeClass}`}>{badgeLabel}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ParticipationSection;
