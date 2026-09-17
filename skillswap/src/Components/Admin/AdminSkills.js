import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import "./styles.css";

import { API_BASE_URL } from "../../config";
const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/skills`);
        const skillsData = response.data.data;
        const skillsWithUserDetails = await Promise.all(
          skillsData.map(async (skill) => {
            try {
              const userResponse = await axios.get(`${API_BASE_URL}/api/users/${skill.userId}`);
              return { ...skill, userName: userResponse.data.fullName };
            } catch (error) {
              return { ...skill, userName: "Unknown User" };
            }
          })
        );
        setSkills(skillsWithUserDetails);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const handleDeleteSkill = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/skills/${id}`);
        setSkills(skills.filter((skill) => skill._id !== id));
        alert("Skill deleted successfully!");
      } catch (error) {
        console.error("Error deleting skill:", error);
        alert("Failed to delete skill.");
      }
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar-title">Manage Skills</div>
        </div>
        
        <div className="admin-content">
          <div className="admin-section-card">
            <div className="admin-search">
              <input
                type="text"
                placeholder="Search skills or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{overflowX: 'auto'}}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Offered By</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSkills.map((skill) => (
                    <tr key={skill._id}>
                      <td>
                        <img 
                          src={`${API_BASE_URL}/${skill.skill_pic}`} 
                          alt="Skill" 
                          style={{width: 48, height: 32, borderRadius: 4, objectFit: 'cover', border: '1px solid var(--border)'}}
                        />
                      </td>
                      <td style={{fontWeight: 500}}>{skill.title}</td>
                      <td style={{textTransform: 'capitalize'}}>{skill.category}</td>
                      <td>{skill.userName}</td>
                      <td>
                        <span style={{
                          background: skill.isRequest ? 'var(--success-light)' : 'var(--bg)',
                          color: skill.isRequest ? 'var(--success)' : 'var(--text-secondary)',
                          padding: '2px 8px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600,
                          border: skill.isRequest ? 'none' : '1px solid var(--border)'
                        }}>
                          {skill.isRequest ? "Requested" : "Available"}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDeleteSkill(skill._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;




