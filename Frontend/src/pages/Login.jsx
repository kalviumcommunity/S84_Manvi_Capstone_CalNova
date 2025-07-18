import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigation
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

  const navigate = useNavigate(); 

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
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

      // Store token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      //  localStorage.setItem("user", JSON.stringify(res.data.user));

        if (isSignup) {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className={`login-container ${isSignup ? "signup-mode" : ""}`}>
      <div className="login-wrapper">
        <div
          className="login-left"
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>

        <div className="login-box">
          <div className="logo">🗓️</div>
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit">
              {isSignup ? "Sign Up →" : "Login →"}
            </button>
          </form>

          <p style={{ color: "crimson", marginTop: "10px" }}>{message}</p>

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
                }}
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
