import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function Home() {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  // Fetch all skills from the backend
  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/skills");
      const skillsData = response.data.data;

      // Filter skills with isApproved: true
      const approvedSkills = skillsData.filter((skill) => skill.isApproved);

      // Fetch user details for each approved skill
      const skillsWithUserDetails = await Promise.all(
        approvedSkills.map(async (skill) => {
          const userResponse = await axios.get(`http://localhost:5000/api/users/${skill.userId}`);
          return { ...skill, userName: userResponse.data.fullName };
        })
      );

      // Fetch request status for the logged-in user
      const requestResponse = await axios.get(`http://localhost:5000/api/requests/${userId}`);
      const requests = requestResponse.data.requests;

      // Merge request status with skills
      const updatedSkills = skillsWithUserDetails.map((skill) => {
        const matchingRequest = requests.find((req) => req.skillId._id === skill._id);
        if (matchingRequest) {
          return { ...skill, isRequested: true, isAccepted: matchingRequest.isAccepted };
        }
        return skill;
      });

      setSkills(updatedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleRequestClick = async (skill) => {
    try {
      // Create a new request
      const response = await axios.post("http://localhost:5000/api/requests", {
        skillId: skill._id,
        userId,
      });

      // Update the skill to reflect the request status
      setSkills((prevSkills) =>
        prevSkills.map((s) =>
          s._id === skill._id ? { ...s, isRequested: true } : s
        )
      );

      alert(response.data.message); // Notify the user
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  const handleOpenChat = (skill) => {
    if (skill.isAccepted) {
      // Navigate to the chat page with necessary parameters (e.g., skill ID and user ID)
      window.location.href = `/chat/${skill._id}/${userId}`;
    } else {
      alert("Chat is only available once the skill request is accepted.");
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div>
      <Nav />
      <main>
        <section id="home">
          <h1>Welcome to SkillSwap</h1>
          <p>Exchange your skills and knowledge with university peers in a collaborative learning environment.</p>
          <div className="cta-buttons">
            <a href="#skills" className="cta">Get Started</a>
            <a href="#about" className="cta secondary">Learn More</a>
          </div>
        </section>

        <section id="skills">
          <h2>Explore Skills</h2>
          <div className="search-section">
            <input
              type="text"
              id="searchInput"
              placeholder="Search categories or skills..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {loading ? (
            <p>Loading skills...</p>
          ) : (
            <div className="skills-section">
              {skills
                .filter((skill) =>
                  skill.title.toLowerCase().includes(searchTerm)
                )
                .map((skill) => (
                  <div className="profile-card" key={skill._id}>
                    <img
                      src={`http://localhost:5000/${skill.skill_pic}`}
                      alt={skill.title}
                      className="profile-pic"
                    />
                    <h3 className="profile-name">{skill.userName}</h3>
                    <p className="profile-skill">Skill: {skill.title}</p>
                    <p className="profile-description">{skill.description}</p>
                    {skill.isRequested ? (
                      skill.isAccepted ? (
                        <button
                          className="request-btn3"
                          onClick={() => handleOpenChat(skill)}
                        >
                          Open Chat
                        </button>
                      ) : (
                        <button className="request-btn2" disabled>
                          Request Sent
                        </button>
                      )
                    ) : (
                      <button
                        className="request-btn"
                        onClick={() => handleRequestClick(skill)}
                      >
                        Send Request
                      </button>
                    )}
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
