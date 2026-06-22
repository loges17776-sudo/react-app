import React, { useState } from "react";

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    workshop: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerParticipant = (e) => {
    e.preventDefault();

    const duplicate = participants.find(
      (p) => p.email.toLowerCase() === form.email.toLowerCase()
    );

    if (duplicate) {
      setMessage("❌ Participant already registered with this email!");
      return;
    }

    setParticipants([...participants, form]);

    setMessage(
      `✅ Registration Confirmed! Welcome ${form.name} to ${form.workshop}.`
    );

    setForm({
      name: "",
      email: "",
      workshop: "",
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const removeParticipant = (email) => {
    setParticipants(participants.filter((p) => p.email !== email));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #4f46e5, #7c3aed, #ec4899)",
        padding: "30px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", color: "white" }}>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          🎓 Workshop Registration Portal
        </h1>

        <p style={{ opacity: 0.9, fontSize: "18px" }}>
          Register, Confirm & Manage Workshop Participants
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <StatCard title="Participants" value={participants.length} icon="👥" />
        <StatCard title="Workshops" value="4" icon="🎯" />
        <StatCard title="Confirmed" value="100%" icon="✅" />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        {/* Registration Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "25px",
            padding: "30px",
            color: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            📝 Workshop Registration
          </h2>

          <form onSubmit={registerParticipant}>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <select
              name="workshop"
              value={form.workshop}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Workshop</option>
              <option>Web Development</option>
              <option>Artificial Intelligence</option>
              <option>Cyber Security</option>
              <option>Cloud Computing</option>
            </select>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(90deg,#ec4899,#8b5cf6,#3b82f6)",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              🚀 Register Now
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "20px",
                background: "rgba(255,255,255,0.2)",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "bold",
              }}
            >
              {message}
            </div>
          )}
        </div>

        {/* Participant List */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "25px",
            padding: "30px",
            color: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2>
            👥 Registered Participants ({participants.length})
          </h2>

          {participants.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "80px",
                opacity: 0.8,
              }}
            >
              No registrations yet...
            </div>
          ) : (
            participants.map((p, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  color: "#111",
                  padding: "15px",
                  borderRadius: "15px",
                  marginTop: "15px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ color: "#7c3aed" }}>👤 {p.name}</h3>

                <p>📧 {p.email}</p>

                <p>
                  🎯 <strong>{p.workshop}</strong>
                </p>

                <button
                  onClick={() => removeParticipant(p.email)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div
      style={{
        width: "200px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        color: "white",
        padding: "20px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ fontSize: "35px" }}>{icon}</div>
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "16px",
};