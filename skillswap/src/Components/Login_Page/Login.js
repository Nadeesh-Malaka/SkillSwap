import React, { useState } from 'react';
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    // Simulate login success
    alert("Login successful!");
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div>
      <Nav />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          

          {/* Email Field */}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password */}
          <a href="#" className="forgot-password">Forgot Password?</a>

          {/* Login Button */}
          <button type="submit" className="login-btn">Log In</button>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Register Button */}
          <button
            type="button"
            className="register-btn"
            onClick={handleRegisterRedirect}
          >
            Not Registered? Create an Account
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
