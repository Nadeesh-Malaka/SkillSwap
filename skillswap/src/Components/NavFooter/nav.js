import React from "react";
import { Link } from "react-router-dom"; // Assuming React Router is used
import "./style.css";

function Nav() {
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
            <li><a href="/contact_us">Contact Us</a></li> {/* Fixed missing '/' */}
            <li><a href="/faq">FAQ</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="/login" className="highlight">Sign Up</a></li>
            <li><a href="/register" className="highlight">Register</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
