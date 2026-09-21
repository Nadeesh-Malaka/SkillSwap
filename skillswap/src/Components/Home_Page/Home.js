import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import { Search } from "lucide-react";

import { API_BASE_URL } from "../../config";
function Home() {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/skills`);
      const skillsData = response.data.data;
      const approvedSkills = skillsData.filter((skill) => skill.isApproved);

      const skillsWithUserDetails = await Promise.all(
        approvedSkills.map(async (skill) => {
          try {
            const userResponse = await axios.get(`${API_BASE_URL}/api/users/${skill.userId}`);
            return { ...skill, userName: userResponse.data.fullName };
          } catch (error) {
            return { ...skill, userName: "Unknown User" };
          }
        })
      );

      const requestResponse = await axios.get(`${API_BASE_URL}/api/requests/${userId}`);
      const requests = requestResponse.data.requests;

      const updatedSkills = skillsWithUserDetails.map((skill) => {
        const matchingRequest = requests.find((req) => req.skillId._id === skill._id);
        if (matchingRequest) return { ...skill, isRequested: true, isAccepted: matchingRequest.isAccepted };
        return skill;
      });

      setSkills(updatedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleRequestClick = async (skill) => {
    try {
      const chatURL = `/chat/${skill._id}/${userId}`;
      const requestResponse = await axios.post(`${API_BASE_URL}/api/requests`, { skillId: skill._id, userId, chatURL });
      await axios.put(`${API_BASE_URL}/api/skills/${skill._id}`, { isRequest: true });
      setSkills((prevSkills) => prevSkills.map((s) => s._id === skill._id ? { ...s, isRequested: true } : s));
      alert(requestResponse.data.message);
    } catch (error) {
      console.error("Error handling request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  const handleOpenChat = (skill) => {
    if (skill.isAccepted) window.location.href = `/chat/${skill._id}/${userId}`;
    else alert("Chat is only available once the skill request is accepted.");
  };

  const handleGiveFeedback = (skillId) => { window.location.href = `/feedback?skillId=${skillId}`; };
  const handleSearch = (e) => { setSearchTerm(e.target.value.toLowerCase()); };

  if (!userId) { console.error("User not logged in."); return null; }

  const filteredSkills = skills.filter((skill) => skill.title.toLowerCase().includes(searchTerm));

  return (
    <div className="home-page">
      <Nav />

      <div className="home-hero">
        <div className="home-hero-inner">
          <div>
            <h1>Explore Skills</h1>
            <p>Discover skills offered by university peers and send exchange requests.</p>
          </div>
          <div className="home-search-bar">
            <Search size={20} color="var(--text-secondary)" />
            <input
              type="text"
              id="searchInput"
              placeholder="Search skills or categories..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="home-section-header">
          <h2>{filteredSkills.length} Skill{filteredSkills.length !== 1 ? 's' : ''} Available</h2>
        </div>

        {loading ? (
          <div className="home-loading">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skill-card skeleton-card">
                <div className="skeleton skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton skeleton-line medium" />
                  <div className="skeleton skeleton-line short" />
                  <div className="skeleton skeleton-line" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="home-empty"><p>No skills found. Try a different search.</p></div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map((skill) => (
              <div className="skill-card" key={skill._id}>
                <img src={`${API_BASE_URL}/${skill.skill_pic}`} alt={skill.title} className="skill-card-image" />
                <div className="skill-card-body">
                  <div className="skill-card-user">
                    <div className="skill-card-avatar">{(skill.userName || 'U')[0].toUpperCase()}</div>
                    <span className="skill-card-username">{skill.userName}</span>
                  </div>
                  <div className="skill-card-title">{skill.title}</div>
                  <div className="skill-card-category">{skill.category}</div>
                  <p className="skill-card-desc">{skill.description}</p>
                  <div className="skill-card-action">
                    {skill.userId === userId ? (
                      <button className="btn-requested" disabled style={{opacity: 0.7, background: 'var(--border)', color: 'var(--text-secondary)'}}>Your Skill</button>
                    ) : skill.isRequested ? (
                      skill.isAccepted ? (
                        <>
                          <button className="btn-chat" onClick={() => handleOpenChat(skill)}>Open Chat</button>
                          <button className="btn-feedback" onClick={() => handleGiveFeedback(skill._id)}>Give Feedback</button>
                        </>
                      ) : (
                        <button className="btn-requested" disabled>Request Sent</button>
                      )
                    ) : (
                      <button className="btn-request" onClick={() => handleRequestClick(skill)}>Send Request</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;




