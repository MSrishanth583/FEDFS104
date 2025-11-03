import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes("@")) {
      setErr("Please enter a valid email address (must include '@').");
      return;
    }
    setErr("");
    onLogin();
  }

  return (
    <div className="container">
      <div className="logo"><span className="icon">📖</span></div>
      <h1>Welcome to Extracurricular Hub!</h1>
      <p className="subtitle">Manage and participate in student extracurricular activities</p>
      <div className="login-card">
        <h2>Sign In</h2>
        <p className="card-desc">
          Sign in to register for clubs, sports, and events, track your participation, and get notifications about upcoming activities.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email / Username</label>
          <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email or username" />
          {err && <span style={{ color: "red", fontSize: "0.97em" }}>{err}</span>}
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
