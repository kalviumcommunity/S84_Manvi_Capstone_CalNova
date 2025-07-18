import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; 
//const user = JSON.parse(localStorage.getItem("user"));


const Dashboard = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/home");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome!, 👋</h1>
      <p className="dashboard-subtitle">Choose from our available services and get started now!</p>


      <div className="card-grid">
        <div className="card">
            <img src="assets/salon.png" alt="salon" className="card-image" />
          <h2>💇‍♀️ Salon Booking</h2>
          <p>Book your hair, skin, or beauty appointments with ease.</p>
        </div>

        <div className="card">
            <img src="assets/therapy.jpg" alt="Therapy" className="card-image"/>
          <h2>🧘 Therapy Booking</h2>
          <p>Schedule therapy sessions for mental well-being and relaxation.</p>
        </div>

        <div className="card">
            <img src="/assets/counsel.png" alt="Counsel" className="card-image"/>
          <h2>🗣️ Counselling Booking</h2>
          <p>Connect with counselors for personal or academic guidance.</p>
        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>Next →</button>
    </div>
  );
};

export default Dashboard;
