import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import Skill_Feedback from "./Skill_Feedback";
import { Edit2, Plus, Paperclip, Check } from "lucide-react";

import { API_BASE_URL } from "../../config";
function SkillListing() {
  const [formData, setFormData] = useState({ skillTitle: "", category: "technology", description: "", file: null });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [requests, setRequests] = useState([]);

  const fetchSkills = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) { alert("User not logged in. Please log in to view your skills."); setLoading(false); return; }
    try {
      const response = await axios.get(`${API_BASE_URL}/api/skills?userId=${userId}`);
      let userSkills = response.data.data.filter((skill) => skill.userId === userId);
      
      try {
        // Fetch requests for each skill to see if they are accepted
        userSkills = await Promise.all(userSkills.map(async (skill) => {
          if (skill.isRequest) {
            try {
              const reqResponse = await axios.get(`${API_BASE_URL}/api/requests/skill/${skill._id}`);
              const requests = reqResponse.data.requests || [];
              if (requests.length > 0) {
                // If any request is accepted, use it. Otherwise just use the first request's data.
                const acceptedReq = requests.find(r => r.isAccepted);
                const reqToUse = acceptedReq || requests[0];
                return {
                  ...skill,
                  isRequestAccepted: reqToUse.isAccepted,
                  chatURL: reqToUse.chatURL
                };
              }
            } catch (e) {
              console.error("Error fetching request for skill", skill._id, e);
            }
          }
          return skill;
        }));
      } catch (reqErr) {
        console.error("Error fetching requests for skills:", reqErr);
      }

      setSkills(userSkills);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      alert("Error fetching skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => { setFormData({ ...formData, file: e.target.files[0] }); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) { alert("User not logged in. Please log in to add a skill."); return; }
    const data = new FormData();
    data.append("title", formData.skillTitle);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("userId", userId);
    if (formData.file) data.append("skill_pic", formData.file);
    try {
      const url = editingSkill ? `${API_BASE_URL}/api/skills/${editingSkill._id}` : `${API_BASE_URL}/api/skills`;
      const method = editingSkill ? "put" : "post";
      await axios[method](url, data, { headers: { "Content-Type": "multipart/form-data" } });
      alert(editingSkill ? "Skill updated successfully!" : "Skill added successfully!");
      setFormData({ skillTitle: "", category: "technology", description: "", file: null });
      setEditingSkill(null);
      fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/skills/${id}`);
        alert("Skill deleted successfully!");
        fetchSkills();
      } catch (error) {
        console.error("Error deleting skill:", error);
        alert("Failed to delete skill. Please try again.");
      }
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({ skillTitle: skill.title, category: skill.category, description: skill.description, file: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const approveRequest = async (skillId) => {
    try {
      const skillReqResponse = await axios.get(`${API_BASE_URL}/api/requests/skill/${skillId}`);
      const skillRequest = skillReqResponse.data.requests[0];
      if (!skillRequest || !skillRequest._id) { alert("Skill request not found!"); return; }
      const response = await axios.patch(`${API_BASE_URL}/api/requests/status`, { requestId: skillRequest._id, isAccepted: true });
      if (response.data.success) {
        setSkills((prev) => prev.map((skill) => skill._id === skillId ? { ...skill, isRequestAccepted: true, chatURL: skillRequest.chatURL } : skill));
        alert("Request approved successfully!");
      } else {
        alert("Failed to approve the request.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      alert("An error occurred while approving the request.");
    }
  };

  return (
    <div>
      <Nav />
      <main className="skill-listing-page">
        <div className="skill-listing-inner">
          <div className="skill-listing-header">
            <h1>My Skills</h1>
            <p style={{color: "var(--text-secondary)", fontSize: "0.9375rem"}}>Manage the skills you offer and handle incoming requests.</p>
          </div>

          <div className="skill-form-card">
            <h2 style={{display: 'flex', alignItems: 'center'}}>
              {editingSkill ? <><Edit2 size={20} style={{marginRight: 6}} /> Edit Skill</> : <><Plus size={20} style={{marginRight: 6}} /> Add New Skill</>}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="skill-form-grid">
                <div style={{marginBottom: 16}}>
                  <label htmlFor="skillTitle">Skill Title *</label>
                  <input type="text" id="skillTitle" name="skillTitle" placeholder="e.g., Python Programming" value={formData.skillTitle} onChange={handleInputChange} required />
                </div>
                <div style={{marginBottom: 16}}>
                  <label htmlFor="category">Category *</label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="technology">Technology & Programming</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="art">Art & Creativity</option>
                    <option value="business">Business</option>
                    <option value="science">Science</option>
                    <option value="gaming">Gaming</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{marginBottom: 16}}>
                <label htmlFor="description">Description *</label>
                <textarea id="description" name="description" rows="4" placeholder="Describe your skill and what you can teach..." value={formData.description} onChange={handleInputChange} required />
              </div>
              <div style={{marginBottom: 20}}>
                <label htmlFor="fileUpload">Skill Image</label>
                <label className="skill-file-label">
                  <Paperclip size={16} style={{marginRight: 6}} />
                  {formData.file ? formData.file.name : "Choose an image..."}
                  <input type="file" id="fileUpload" name="fileUpload" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
              <div className="skill-form-actions">
                <button type="submit" className="btn-save">{editingSkill ? "Update Skill" : "Save Skill"}</button>
                {editingSkill && <button type="button" className="btn-cancel" onClick={() => setEditingSkill(null)}>Cancel</button>}
              </div>
            </form>
          </div>

          <div className="skill-list-card">
            <div className="skill-list-card-header"><h2>My Listed Skills</h2></div>
            <div className="skill-table-wrapper">
              {loading ? (
                <div className="skill-table-empty">Loading skills...</div>
              ) : skills.length === 0 ? (
                <div className="skill-table-empty">No skills listed yet. Add your first skill above!</div>
              ) : (
                <table className="skill-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Requests</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill) => (
                      <tr key={skill._id}>
                        <td><strong>{skill.title}</strong></td>
                        <td><span style={{textTransform: "capitalize"}}>{skill.category}</span></td>
                        <td><div className="skill-table-desc">{skill.description}</div></td>
                        <td>
                          {skill.skill_pic && (
                            <img src={`${API_BASE_URL}/${skill.skill_pic}`} alt="Skill" className="skill-image" />
                          )}
                        </td>
                        <td>
                          <span className={`status ${skill.isApproved ? "approved" : "not-approved"}`}>
                            {skill.isApproved ? <><Check size={14} style={{marginRight: 4}} /> Approved</> : "Pending"}
                          </span>
                        </td>
                        <td>
                          {skill.isRequest ? (
                            skill.isRequestAccepted && skill.chatURL ? (
                              <a href={skill.chatURL}>
                                <button className="chat-button">Open Chat</button>
                              </a>
                            ) : (
                              <button className="chat-button2" onClick={() => approveRequest(skill._id)}>Approve Request</button>
                            )
                          ) : (
                            <span style={{color: "var(--text-secondary)", fontSize: "0.875rem"}}>No requests</span>
                          )}
                        </td>
                        <td>
                          <div className="skill-action-btns">
                            <button className="edit-button" onClick={() => handleEdit(skill)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(skill._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <Skill_Feedback />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SkillListing;




