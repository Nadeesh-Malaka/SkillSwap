import React, { useState } from 'react';
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct import

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Decode the token to get role and other details
        const decodedToken = jwtDecode(token);

        // Store the token in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('userId', decodedToken.id);

        // Debugging output
        console.log("Decoded Token:", decodedToken); 
        console.log("Role from Decoded Token:", decodedToken.role);
        console.log("User ID from Decoded Token:", decodedToken.id);

        // Role-based navigation
        if (decodedToken.role === 'admin') {
          navigate('/admin/home'); // Admins go to /admin/home
        } else if (decodedToken.role === 'user') {
          navigate('/home'); // Regular users go to /home
        } else {
          navigate('/');;
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
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

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

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
