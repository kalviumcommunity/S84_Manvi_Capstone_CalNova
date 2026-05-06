import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch mock appointments from local storage
    const storedAppointments = JSON.parse(localStorage.getItem("mock_appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBookNew = () => {
    navigate("/dashboard"); // Go to dashboard to select service first
  };

  return (
    <div className="home-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div>
          <div className="logo">✨ CalNova</div>
          <ul className="nav-links">
            <li onClick={() => navigate("/dashboard")}><span>🏠</span> Dashboard</li>
            <li onClick={() => navigate("/home")} style={{color: 'var(--text-primary)', background: 'rgba(0,0,0,0.05)'}}><span>📅</span> Appointments</li>
            <li onClick={() => navigate("/owners")}><span>💼</span> Owners</li>
          </ul>
        </div>
        <div className="user-info">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="home-content">
        <div className="home-main-left">
          <div>
            <h1>Welcome back, <span className="highlight">{user.name}</span>!</h1>
            <p>Manage your premium wellness schedule and appointments.</p>
          </div>

          <div className="appointments-section">
            <h3>
              Upcoming Appointments
              <button className="book-new-btn" onClick={handleBookNew}>+ Book New</button>
            </h3>
            
            {appointments.length > 0 ? (
              appointments.map((apt, index) => (
                <div key={index} className="appointment-card">
                  <div className="appointment-info">
                    <h4>{apt.service}</h4>
                    <p>{new Date(apt.date).toLocaleDateString()} at {apt.time}</p>
                  </div>
                  <span style={{color: 'var(--text-secondary)'}}>Upcoming</span>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                You have no upcoming appointments.<br/>
                Click 'Book New' to schedule a session.
              </div>
            )}
          </div>
        </div>

        <div className="home-right-panel">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="mini-profile" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)', backgroundColor: 'rgba(0,0,0,0.05)'}}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="profile-info">
              <h4>{user.name}</h4>
              <p>Premium Member</p>
            </div>
          </div>

          {/* Calendar */}
          <div className="calendar-box">
            <h3>📅 Your Calendar</h3>
            <Calendar value={date} onChange={setDate}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
