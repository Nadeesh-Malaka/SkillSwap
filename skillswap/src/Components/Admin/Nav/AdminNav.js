import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook for redirection
import "./AdminNav.css";
import Nav from "../../NavFooter/nav";
import Adminuser from "../Users/Adminuser";
import AdminSkills from "../Skills/AdminSkills";
import AdminChat from "../Chats/AdminChat";
import AdminContact from "../Contacts/AdminContact";
import SkillsFeedback from "../SkillFeedbacks/SkillsFeedback";
import UserFeedback from "../UsersFeedbacks/UserFeedback";

const AdminNav = () => {
  const [activeSection, setActiveSection] = useState("users-section");
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Function to handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Remove auth token from localStorage
    // Optional: Remove any other session-related data
    navigate("/login"); // Redirect to login page
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  // Function to render the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "users-section":
        return <Adminuser />;
      case "skills-section":
        return <AdminSkills />;
      case "chat-section":
        return <AdminChat />;
      case "user-feedback-section":
        return <UserFeedback />;
      case "skills-feedback-section":
        return <SkillsFeedback />;
      case "contact-section":
        return <AdminContact />;
      default:
        return <Adminuser />;
    }
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="sidenav">
          <h2 className="brand-title">Admin Dashboard</h2>
          <ul>
            <li>
              <a
                href="#"
                className={activeSection === "users-section" ? "active" : ""}
                onClick={() => handleNavClick("users-section")}
              >
                Users
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeSection === "skills-section" ? "active" : ""}
                onClick={() => handleNavClick("skills-section")}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeSection === "chat-section" ? "active" : ""}
                onClick={() => handleNavClick("chat-section")}
              >
                Chat
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeSection === "skills-feedback-section" ? "active" : ""}
                onClick={() => handleNavClick("skills-feedback-section")}
              >
                Skills Feedback
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeSection === "contact-section" ? "active" : ""}
                onClick={() => handleNavClick("contact-section")}
              >
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="logout" onClick={handleSignOut}>
                Logout
              </a>
            </li>
          </ul>
        </div>
        <div className="main-content">{renderActiveSection()}</div>
      </div>
    </div>
  );
};

export default AdminNav;
