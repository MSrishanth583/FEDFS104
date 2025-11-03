import React from "react";

export default function EventsTable({ events, participation, onRegister, onUnregister }) {
  return (
    <table className="events-table" id="eventsTable">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {events.map(ev => {
          const partStatus = participation.find(p => p.id === ev.id);
          return (
            <tr key={ev.id}>
              <td>
                {ev.name}{" "}
                <span className={`badge ${ev.tagClass}`}>{ev.tag}</span>
              </td>
              <td>{ev.date}</td>
              <td>{ev.time}</td>
              <td>
                {partStatus ? (
                  <button className="register-btn" onClick={() => onUnregister(ev)}>
                    Unregister
                  </button>
                ) : (
                  <button className="register-btn" onClick={() => onRegister(ev)}>
                    Register
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
