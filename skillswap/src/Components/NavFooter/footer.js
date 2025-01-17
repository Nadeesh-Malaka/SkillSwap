import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">SkillSwap</h2>
        <ul className="footer-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="social-links">
          <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="footer-text">© 2024 SkillSwap. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
