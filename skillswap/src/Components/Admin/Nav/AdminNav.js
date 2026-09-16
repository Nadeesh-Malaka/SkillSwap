import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNav.css";
import Adminuser from "../Users/Adminuser";
import AdminSkills from "../Skills/AdminSkills";
import AdminChat from "../Chats/AdminChat";
import AdminContact from "../Contacts/AdminContact";
import SkillsFeedback from "../SkillFeedbacks/SkillsFeedback";
import UserFeedback from "../UsersFeedbacks/UserFeedback";
import { Home, Users, Wrench, MessageCircle, Star, Mail, ArrowLeft, UserCheck, Menu, X } from "lucide-react";

const AdminNav = () => {
  const [activeSection, setActiveSection] = useState("users-section");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "users-section": return <Adminuser />;
      case "skills-section": return <AdminSkills />;
      case "chat-section": return <AdminChat />;
      case "skills-feedback-section": return <SkillsFeedback />;
      case "user-feedback-section": return <UserFeedback />;
      case "contact-section": return <AdminContact />;
      default: return <Adminuser />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "users-section": return "Manage Users";
      case "skills-section": return "Manage Skills";
      case "chat-section": return "Chat Analytics";
      case "skills-feedback-section": return "Skills Feedback";
      case "user-feedback-section": return "User Feedback";
      case "contact-section": return "Contact Inquiries";
      default: return "Dashboard";
    }
  };

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div 
          style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90}} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className="admin-sidebar-logo">Skill<span>Swap</span></div>
          <button className="admin-mobile-menu-btn" onClick={() => setSidebarOpen(false)} style={{padding: 4}}>
            <X size={20} />
          </button>
        </div>
        <div className="admin-sidebar-role">Admin Dashboard</div>

        <div className="admin-nav-label">Main Menu</div>
        <ul className="admin-nav-list">
          <li>
            <button className={activeSection === "users-section" ? "active" : ""} onClick={() => handleNavClick("users-section")}>
              <Users size={18} /> Users
            </button>
          </li>
          <li>
            <button className={activeSection === "skills-section" ? "active" : ""} onClick={() => handleNavClick("skills-section")}>
              <Wrench size={18} /> Skills
            </button>
          </li>
          <li>
            <button className={activeSection === "chat-section" ? "active" : ""} onClick={() => handleNavClick("chat-section")}>
              <MessageCircle size={18} /> Chat
            </button>
          </li>
          <li>
            <button className={activeSection === "skills-feedback-section" ? "active" : ""} onClick={() => handleNavClick("skills-feedback-section")}>
              <Star size={18} /> Skills Feedback
            </button>
          </li>
          <li>
            <button className={activeSection === "user-feedback-section" ? "active" : ""} onClick={() => handleNavClick("user-feedback-section")}>
              <UserCheck size={18} /> User Feedback
            </button>
          </li>
          <li>
            <button className={activeSection === "contact-section" ? "active" : ""} onClick={() => handleNavClick("contact-section")}>
              <Mail size={18} /> Contact
            </button>
          </li>
        </ul>

        <div className="admin-sidebar-spacer"></div>
        
        <ul className="admin-nav-list" style={{margin: 0}}>
          <li>
            <button className="logout-link" onClick={() => navigate("/")}>
              <ArrowLeft size={18} /> Back to Site
            </button>
          </li>
          <li>
            <button className="logout-link" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <button className="admin-mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="admin-topbar-title">{getSectionTitle()}</div>
          </div>
          <div className="admin-topbar-badge">Admin System</div>
        </div>
        <div className="admin-content">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
