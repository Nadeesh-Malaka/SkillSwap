import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import "./styles.css";

const AdminHome = () => {
  const [counts, setCounts] = useState({ users: 0, skills: 0, requestedSkills: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await axios.get("http://localhost:5000/api/users");
        const skillsRes = await axios.get("http://localhost:5000/api/skills");
        const users = usersRes.data.length || 0;
        const skillsData = skillsRes.data.data || [];
        const skillsCount = skillsData.length;
        const requestedSkillsCount = skillsData.filter((skill) => skill.isRequest).length;

        setCounts({ users, skills: skillsCount, requestedSkills: requestedSkillsCount });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-title">Dashboard Overview</div>
          <div className="admin-topbar-badge">Admin</div>
        </div>
        <div className="admin-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            
            <div className="admin-section-card" style={{ padding: '24px', margin: 0 }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Total Users</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{counts.users}</div>
            </div>
            
            <div className="admin-section-card" style={{ padding: '24px', margin: 0 }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Total Skills Listed</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{counts.skills}</div>
            </div>
            
            <div className="admin-section-card" style={{ padding: '24px', margin: 0 }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Active Skill Requests</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{counts.requestedSkills}</div>
            </div>

          </div>

          <div className="admin-section-card">
            <div className="admin-section-header">
              <h3>System Status</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>
                All systems are operational. You can manage users and skills from the sidebar menu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
