import React, { useState } from 'react';
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { API_BASE_URL } from "../../config";
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) { setErrorMessage("Please fill in both fields."); return; }
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        const decodedToken = jwtDecode(token);
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('userId', decodedToken.id);
        if (decodedToken.role === 'admin') navigate('/admin/home');
        else if (decodedToken.role === 'user') navigate('/home');
        else navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message || "Login failed." : "An error occurred. Please try again later.");
    }
  };

  const handleRegisterRedirect = () => navigate('/register');

  return (
    <div>
      <Nav />
      <div className="auth-page">
        <div className="auth-brand-panel">
          <div className="auth-brand-logo">Skill<span>Swap</span></div>
          <p className="auth-brand-tagline">Connect with university peers to exchange skills and grow together.</p>
          <div className="auth-brand-dots"><span></span><span></span><span></span></div>
        </div>
        <div className="auth-form-panel">
          <div className="auth-form-box">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Sign in to your SkillSwap account.</p>
            {errorMessage && <div className="auth-error">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="text" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <a href="#!" className="auth-forgot">Forgot Password?</a>
              <button type="submit" className="auth-submit-btn">Log In</button>
              <div className="auth-divider">or</div>
              <button type="button" className="auth-secondary-btn" onClick={handleRegisterRedirect}>Not Registered? Create an Account</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;




