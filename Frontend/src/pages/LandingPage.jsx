import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LandingPage.css";
import "../styles/Navbar.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="landing-container" style={{backgroundImage: "url('/assets/backgroundimage.png')"}}>
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <Link to="/" className="logo-text">CalNova</Link>
          </div>
          <div className="nav-links" style={{flexDirection: "row"}}>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

  
      <header className="hero">
        <h1 className="title">CalNova</h1>
        <p className="subtitle">Simplify your bookings. Empower your business.</p>
        <button className="btn primary" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>

     
      <section className="features">
        <h2 className="section-title">Why Choose CalNova?</h2>
        <div className="feature-cards">
          <div className="card">
            <span className="emoji">📅</span>
            <h3>Easy Scheduling</h3>
            <p>Manage appointments and availability effortlessly in one place.</p>
          </div>
          <div className="card">
            <span className="emoji">⚡</span>
            <h3>Time-Saving</h3>
            <p>Let clients book instantly based on availability.</p>
          </div>
          <div className="card">
            <span className="emoji">🎯</span>
            <h3>Built for You</h3>
            <p>Designed for solo professionals, coaches, tutors, and small teams.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        © {new Date().getFullYear()} CalNova. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
