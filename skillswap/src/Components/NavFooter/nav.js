import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in and their role when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT to get the role
      setIsLoggedIn(true);
      if (decodedToken.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  // Handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login"); // Redirect to home or login
  };

  function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
  }

  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/">Skill<span>Swap</span></Link> {/* Using Link for React Router */}
        </div>

        <nav>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="/contact_us">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="#">Terms of Use</a></li>
            
            {/* Conditionally render "Sign Up" and "Login" links */}
            {!isLoggedIn ? (
              <>
                <li><a href="/login" className="highlight">Sign In</a></li>
                <li><a href="/register" className="highlight">Register</a></li>
              </>
            ) : (
              <>
                {/* Admin Link */}
                {isAdmin && <li><a href="/admin/home" className="highlight">Admin</a></li>}
                <li><a href="#" className="highlight" onClick={handleSignOut}>Sign Out</a></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
