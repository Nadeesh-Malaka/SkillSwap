import React, { useState } from "react";
import userImage from "./profile.png";
import "./Profile.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function Profile() {
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    gmail: "nadeeshmalaka@gmail.com",
    contact_Num: "0774902773",
    uni_name: "University of Colombo",
    bio: "I Am A SkillSwap User. I Love To Learn And Teach New Skills.",
    skillsTeach: ["Web Development", "JavaScript"],
    skillsLearn: ["React", "Node.js"],
    upcomingSessions: [
      { id: 1, skill: "Web Development", with: "Jane", date: "12/12/2024", time: "3:00 PM" },
      { id: 2, skill: "JavaScript", with: "Mark", date: "13/12/2024", time: "10:00 AM" },
    ],
    completedSessions: [
      { id: 3, skill: "React", with: "Sarah", date: "10/12/2024", time: "1:00 PM" },
    ],
    profile_pic: userImage,
  });

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSkillChange = (skillType, index, value) => {
    const updatedSkills = [...userData[skillType]];
    updatedSkills[index] = value;
    setUserData({ ...userData, [skillType]: updatedSkills });
  };

  const handleSkillAdd = (skillType) => {
    setUserData({ ...userData, [skillType]: [...userData[skillType], ""] });
  };

  const handleSkillDelete = (skillType, index) => {
    const updatedSkills = [...userData[skillType]];
    updatedSkills.splice(index, 1);
    setUserData({ ...userData, [skillType]: updatedSkills });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, profile_pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-pic-input").click();
  };

  return (
    <div>
      <Nav />
      <div className="profile-container">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-pic-wrapper">
            <img
              src={userData.profile_pic}
              alt="Profile"
              className="profile-pic"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              id="profile-pic-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
          </div>
          <div className="profile-details">
            <label>Name:</label>
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
            <label>Email:</label>
            <input type="text" value={userData.gmail} readOnly />
            <label>Contact Number:</label>
            <input
              type="text"
              value={userData.contact_Num}
              onChange={(e) => handleInputChange("contact_Num", e.target.value)}
            />
            <label>University:</label>
            <input
              type="text"
              value={userData.uni_name}
              onChange={(e) => handleInputChange("uni_name", e.target.value)}
            />
            <label>Bio:</label>
            <textarea
              value={userData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
            />
            <div className="button-group">
              <button className="btn-save">Save</button>
              <button className="btn-reset">Reset</button>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <h3>Skills</h3>

          {/* Skills I Teach */}
          <div>
            <h4>Skills I Offer:</h4>
            {userData.skillsTeach.map((skill, index) => (
              <div key={index} className="skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    handleSkillChange("skillsTeach", index, e.target.value)
                  }
                />
                <button
                  onClick={() => handleSkillDelete("skillsTeach", index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => handleSkillAdd("skillsTeach")}>
              Add Skill
            </button>
          </div>

          {/* Skills I Want to Learn */}
          <div>
            <h4>Skills I Want to Learn:</h4>
            {userData.skillsLearn.map((skill, index) => (
              <div key={index} className="skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    handleSkillChange("skillsLearn", index, e.target.value)
                  }
                />
                <button
                  onClick={() => handleSkillDelete("skillsLearn", index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button onClick={() => handleSkillAdd("skillsLearn")}>
              Add Skill
            </button>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="sessions-section">
          <h3>Upcoming Skill Exchange Sessions</h3>
          <ul>
            {userData.upcomingSessions.map((session) => (
              <li key={session.id}>
                {session.skill} with {session.with} - {session.date} at{" "}
                {session.time}{" "}
                <button>View Details</button>
                <button>Cancel</button>
              </li>
            ))}
          </ul>

          <h3>Completed Sessions</h3>
          <ul>
            {userData.completedSessions.map((session) => (
              <li key={session.id}>
                {session.skill} with {session.with} - {session.date} at{" "}
                {session.time} <button>View Details</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
