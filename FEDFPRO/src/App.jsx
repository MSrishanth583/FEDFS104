import React, { useState } from "react";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import ModalPopup from "./ModalPopup";
import "./App.css";

const initialEvents = [
  { id: 1, name: "Chess Club Tournament", tag: "Competition", tagClass: "competition", date: "25 Sep 2025", time: "3:00 PM" },
  { id: 2, name: "Inter-School Football Match", tag: "Sports", tagClass: "sports", date: "28 Sep 2025", time: "5:00 PM" },
  { id: 3, name: "Art & Craft Workshop", tag: "Workshop", tagClass: "workshop", date: "30 Sep 2025", time: "11:00 AM" },
  { id: 4, name: "Debate Competition", tag: "Competition", tagClass: "competition", date: "2 Oct 2025", time: "2:00 PM" },
  { id: 5, name: "Music Jam Session", tag: "Arts", tagClass: "arts", date: "5 Oct 2025", time: "4:00 PM" }
];

const initialParticipation = [
  { id: 6, name: "Science Fair", date: "15 Sep 2025", status: "registered" },
  { id: 7, name: "Photography Club", date: "20 Sep 2025", status: "attended" },
];

function App() {
  const [page, setPage] = useState("login"); // "login" or "dashboard"
  const [events] = useState(initialEvents);
  const [participation, setParticipation] = useState([...initialParticipation]);
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // LOGIN
  const handleLogin = () => setPage("dashboard");
  const handleLogout = () => setPage("login");

  // Modal helpers
  const openModal = (title, message, onConfirm) => {
    setModal({ visible: true, title, message, onConfirm });
  };
  const closeModal = () => setModal(m => ({ ...m, visible: false }));

  // Register & Unregister
  const handleRegisterEvent = (event) => {
    if (!participation.find(p => p.id === event.id)) {
      setParticipation(prev => ([...prev, { id: event.id, name: event.name, date: event.date, status: "registered" }]));
    }
  };
  const handleUnregisterEvent = (event) => {
    setParticipation(prev => prev.filter(p => p.id !== event.id));
  };

  // Modal logic for events
  const handleRegisterClick = (event) => {
    openModal(`Register for Event`, `Do you want to register for "${event.name}"?`, () => {
      handleRegisterEvent(event);
      closeModal();
    });
  };
  const handleUnregisterClick = (event) => {
    openModal(`Unregister from Event`, `Are you sure you want to unregister from "${event.name}"?`, () => {
      handleUnregisterEvent(event);
      closeModal();
    });
  };

  return (
    <>
      {page === "login" && <LoginPage onLogin={handleLogin} />}
      {page === "dashboard" &&
        <DashboardPage
          events={events}
          participation={participation}
          onLogout={handleLogout}
          onRegister={handleRegisterClick}
          onUnregister={handleUnregisterClick}
        />
      }
      <ModalPopup
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
      />
    </>
  );
}

export default App;
