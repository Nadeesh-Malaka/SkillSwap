import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Skill<span>Swap</span></div>
            <p>Connect, learn, and exchange skills with university peers in a collaborative environment.</p>
            <div className="social-links">
              <a href="#!" className="social-icon" aria-label="Facebook">f</a>
              <a href="#!" className="social-icon" aria-label="Twitter">t</a>
              <a href="#!" className="social-icon" aria-label="Instagram">in</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/skill_list">Skill Listing</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/contact_us">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} SkillSwap. All rights reserved.</p>
          <p>Built for university students.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
