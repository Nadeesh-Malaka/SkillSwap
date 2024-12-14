import React, { useState } from 'react';
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleHamburgerClick = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simple login validation
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    alert("Login successful!");
  };

  return (
    <div>
      <Nav/>
      
      {/* Login Page Content */}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {/* Email/Username Field */}
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email or username"
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

          {/* Forgot Password Link */}
          <a href="#" className="forgot-password">Forgot Password?</a>

          {/* Log In Button */}
          <button type="submit" className="login-btn">Log In</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default LoginPage;
