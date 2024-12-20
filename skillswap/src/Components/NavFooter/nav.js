import React from "react";
import "./style.css";

function nav() {
  function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
  }

  return (
    <div>
      <header>
        <div className="logo">
          Skill<span>Swap</span>
        </div>

        <nav>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#" className="highlight">Sign Up</a></li>
            <li><a href="#" className="highlight">Register</a></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default nav;
