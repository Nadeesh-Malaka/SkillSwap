import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, CheckCircle, XCircle, Trash2 } from "lucide-react";

import { API_BASE_URL } from "../../../config";
const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/skills`);
      setSkills(response.data.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/skills/${id}/approve`);
      fetchSkills();
    } catch (error) {
      console.error("Error approving skill:", error);
      alert("Failed to approve skill.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/skills/${id}/reject`);
      fetchSkills();
    } catch (error) {
      console.error("Error rejecting skill:", error);
      alert("Failed to reject skill.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/skills/${id}`);
        fetchSkills();
      } catch (error) {
        console.error("Error deleting skill:", error);
        alert("Failed to delete skill.");
      }
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const filteredSkills = skills.filter((skill) =>
    skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-section-card">
      <div className="admin-section-header">
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div className="admin-search" style={{padding: 0, border: 'none'}}>
            <div style={{position: 'relative'}}>
              <Search size={16} color="var(--text-secondary)" style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)'}} />
              <input 
                type="text" 
                placeholder="Search skills by title or category..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                style={{paddingLeft: 34}} 
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{overflowX: 'auto'}}>
        {loading ? (
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>Loading skills...</div>
        ) : filteredSkills.length === 0 ? (
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>No skills found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill._id}>
                  <td>
                    <img 
                      src={`${API_BASE_URL}/${skill.skill_pic || "images/default_skill.png"}`} 
                      alt={skill.title} 
                      style={{width: 48, height: 32, borderRadius: 4, objectFit: 'cover', border: '1px solid var(--border)'}}
                    />
                  </td>
                  <td style={{fontWeight: 500}}>{skill.title}</td>
                  <td style={{textTransform: 'capitalize'}}>{skill.category}</td>
                  <td>
                    <span style={{
                      background: skill.isApproved ? 'var(--success-light)' : 'var(--warning-light)',
                      color: skill.isApproved ? 'var(--success)' : '#d97706',
                      padding: '2px 8px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600
                    }}>
                      {skill.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: 8}}>
                      {!skill.isApproved && (
                        <button className="btn" style={{padding: '4px 8px', color: 'var(--success)', borderColor: 'var(--success)'}} onClick={() => handleApprove(skill._id)}>
                          <CheckCircle size={14} />
                        </button>
                      )}
                      {skill.isApproved && (
                        <button className="btn" style={{padding: '4px 8px', color: '#d97706', borderColor: '#d97706'}} onClick={() => handleReject(skill._id)}>
                          <XCircle size={14} />
                        </button>
                      )}
                      <button className="btn btn-danger" style={{padding: '4px 8px'}} onClick={() => handleDelete(skill._id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSkills;




