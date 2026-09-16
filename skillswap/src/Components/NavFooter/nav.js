import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsLoggedIn(true);
      if (decodedToken.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) navLinks.classList.toggle("show");
  }

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          Skill<span>Swap</span>
        </Link>

        <div className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/aboutus">About</Link></li>
          <li><Link to="/contact_us">Contact Us</Link></li>
          {/* <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/terms">Terms of Use</Link></li> */}

          <li><div className="nav-divider" /></li>

          {!isLoggedIn ? (
            <>
              <li><Link to="/login" className="nav-signin">Sign In</Link></li>
              <li><Link to="/register" className="nav-register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/skill_list">My Skills</Link></li>
              <li><Link to="/profile" className="nav-signin">Profile</Link></li>
              {isAdmin && <li><Link to="/admin/home">Admin</Link></li>}
              <li>
                <a href="#!" className="nav-signout" onClick={handleSignOut}>
                  Sign Out
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Nav;
