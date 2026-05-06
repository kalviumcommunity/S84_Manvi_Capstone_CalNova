import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const bgImg = "/image.png";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client"
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null); // 'success' | 'error'

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:8000/api/auth/register"
        : "http://localhost:8000/api/auth/login";

      const payload = isSignup
        ? formData
        : { email: formData.email, password: formData.password };

      const res = await axios.post(url, payload);

      setMessage(isSignup ? "Registration successful!" : "Login successful!");
      setMessageType("success");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        
        // Save user to local storage to prevent "Guest User" display
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          // Fallback if backend doesn't return user object directly
          const fallbackName = formData.name || formData.email.split('@')[0];
          localStorage.setItem("user", JSON.stringify({ name: fallbackName, email: formData.email }));
        }

        if (isSignup) {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong.");
      setMessageType("error");
    }
  };

  return (
    <div className="login-container">
      <div className={`login-wrapper ${isSignup ? "active" : ""}`}>

        {/* IMAGE SIDE */}
        <div
          className="login-left"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>

        {/* FORM SIDE */}
        <div className="login-box">
          <div className="logo">🗓️</div>

          <div
            key={isSignup ? "mode-signup" : "mode-login"}
            className="login-switch-panel"
          >
            <h2>
              {isSignup
                ? "Create Your CalNova Account"
                : "Welcome Back to CalNova"}
            </h2>

            <form onSubmit={handleSubmit}>
              {isSignup && (
                <>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </>
              )}

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <button type="submit">
                {isSignup ? "Sign Up →" : "Login →"}
              </button>
            </form>

            {message ? (
              <p
                className={`form-message form-message--${messageType}`}
                role="alert"
              >
                {message}
              </p>
            ) : null}

            <div className="extras">
              {!isSignup && <a href="#">Forgot your password?</a>}
              <br />
              <span>
                {isSignup
                  ? "Already have an account?"
                  : "Don’t have an account?"}{" "}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setMessage("");
                    setMessageType(null);
                  }}
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;