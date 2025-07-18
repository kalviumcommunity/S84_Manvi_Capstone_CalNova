import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const [date, setDate] = useState(new Date());

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="logo">🗓️ CalNova</div>
        <ul className="nav-links">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/bookings")}>Bookings</li>
          <li onClick={() => navigate("/Owners")}>Owners</li>
        </ul>
        <div className="user-info">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="home-content">
        <div className="home-main-left">
          <h1>Welcome to <span className="highlight">CalNova</span></h1>
          <p>Your one-stop solution for salon, therapy, and counselling bookings.</p>
        </div>

        <div className="home-right-panel">
          {/* Profile Card */}
          <div className="profile-card">
            <img
              src="https://i.pinimg.com/736x/bc/ef/02/bcef02ef3821f9237dc585b8d84618e4.jpg"
              alt="Profile"
              className="mini-profile"
            />
            <h4>{user.name}</h4>
            <p>Client User</p>
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
