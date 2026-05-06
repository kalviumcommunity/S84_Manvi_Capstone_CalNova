import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Booking.css";

const services = ["Salon", "Therapy", "Counselling"];
const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if a service was passed in the URL query params
    const queryParams = new URLSearchParams(location.search);
    const serviceFromUrl = queryParams.get("service");
    if (serviceFromUrl && services.includes(serviceFromUrl)) {
      setSelectedService(serviceFromUrl);
    }
  }, [location]);

  const handleBookingSubmit = () => {
    if (!selectedService || !selectedTime) {
      alert("Please select a service and time slot.");
      return;
    }

    // Save to local storage to mock backend functionality
    const newAppointment = {
      service: selectedService,
      date: selectedDate.toISOString(),
      time: selectedTime,
      createdAt: new Date().toISOString()
    };

    const existingAppointments = JSON.parse(localStorage.getItem("mock_appointments")) || [];
    localStorage.setItem("mock_appointments", JSON.stringify([...existingAppointments, newAppointment]));

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="booking-container">
        <div className="booking-card success-message">
          <div className="success-icon">✨</div>
          <h2>Booking Confirmed!</h2>
          <p>Your {selectedService} appointment on {selectedDate.toLocaleDateString()} at {selectedTime} has been successfully scheduled.</p>
          <button className="submit-booking-btn view-appointments-btn" onClick={() => navigate("/home")}>
            View My Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        
        <h2>Schedule Appointment</h2>
        <p>Select a service, date, and time that works for you.</p>

        <div className="form-group">
          <label>1. Select Service</label>
          <div className="service-selector">
            {services.map((service) => (
              <button 
                key={service}
                className={`service-btn ${selectedService === service ? "active" : ""}`}
                onClick={() => setSelectedService(service)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>2. Select Date</label>
          <div className="booking-calendar-wrapper">
            <Calendar 
              value={selectedDate} 
              onChange={setSelectedDate}
              minDate={new Date()} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>3. Select Time</label>
          <div className="time-grid">
            {timeSlots.map((time) => (
              <button 
                key={time}
                className={`time-btn ${selectedTime === time ? "active" : ""}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button 
          className="submit-booking-btn" 
          onClick={handleBookingSubmit}
          disabled={!selectedService || !selectedTime}
          style={{ opacity: (!selectedService || !selectedTime) ? 0.5 : 1 }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
