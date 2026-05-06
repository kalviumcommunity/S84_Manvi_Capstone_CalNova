import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; 

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/home");
  };

  const handleBook = (serviceName) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome! 👋</h1>
      <p className="dashboard-subtitle">Choose from our available premium services and get started on your wellness journey today.</p>

      <div className="card-grid">
        <div className="card" onClick={() => handleBook("Salon")}>
          <img src="assets/salon.png" alt="Salon" className="card-image" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000'} />
          <h2>💇‍♀️ Salon Booking</h2>
          <p>Book your premium hair, skin, or beauty appointments with our top stylists.</p>
          <button className="book-btn">Book Now</button>
        </div>

        <div className="card" onClick={() => handleBook("Therapy")}>
          <img src="assets/therapy.jpg" alt="Therapy" className="card-image" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000'}/>
          <h2>🧘 Therapy Booking</h2>
          <p>Schedule relaxing therapy sessions for mental well-being and rejuvenation.</p>
          <button className="book-btn">Book Now</button>
        </div>

        <div className="card" onClick={() => handleBook("Counselling")}>
          <img src="/assets/counsel.png" alt="Counsel" className="card-image" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000'}/>
          <h2>🗣️ Counselling</h2>
          <p>Connect with expert counselors for personal growth or academic guidance.</p>
          <button className="book-btn">Book Now</button>
        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>Skip to Home →</button>
    </div>
  );
};

export default Dashboard;
