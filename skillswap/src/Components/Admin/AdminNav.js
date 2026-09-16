import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import { Home, Users, Wrench, ArrowLeft } from "lucide-react";

const AdminNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-logo">
        Skill<span>Swap</span>
      </div>
      <div className="admin-sidebar-role">Admin Dashboard</div>

      <div className="admin-nav-label">Main Menu</div>
      <ul className="admin-nav-list">
        <li>
          <Link to="/admin/home" className={currentPath === "/admin/home" ? "active" : ""}>
            <Home size={18} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className={currentPath === "/admin/users" ? "active" : ""}>
            <Users size={18} /> Users
          </Link>
        </li>
        <li>
          <Link to="/admin/skills" className={currentPath === "/admin/skills" ? "active" : ""}>
            <Wrench size={18} /> Skills
          </Link>
        </li>
      </ul>

      <div className="admin-sidebar-spacer"></div>
      
      <ul className="admin-nav-list" style={{margin: 0}}>
        <li>
          <Link to="/" className="logout-link">
            <ArrowLeft size={18} /> Back to Site
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
