// Profile.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import userImage from "./profile.png";
import "./Profile.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("User ID not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const user = response.data;

        setUserData({
          ...user,
          profile_pic: user.profile_pic || userImage,
          skillsTeach: user.sk_Teach || [],
          skillsLearn: user.sk_Learn || [],
        });
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({ ...userData, profile_pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User ID not found. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("profile_pic", profilePicFile);
      formData.append("fullName", userData.fullName);
      formData.append("contact_Num", userData.contact_Num);
      formData.append("uni_Name", userData.uni_Name);
      formData.append("bio", userData.bio);
      formData.append("sk_Learn", JSON.stringify(userData.skillsLearn));
      formData.append("sk_Teach", JSON.stringify(userData.skillsTeach));

      await axios.put(`http://localhost:5000/api/users/${userId}/profile-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      alert("Failed to save changes.");
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="profile-container">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Nav />
        <div className="profile-container">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="profile-container">
        <div className="profile-section">
          <div className="profile-pic-wrapper">
            <img
              src={`http://localhost:5000/${userData.profile_pic}`}
              alt="Profile"
              className="profile-pic"
              onClick={() => document.getElementById("profile-pic-input").click()}
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
            <input type="text" value={userData.email} readOnly />
            <label>Contact Number:</label>
            <input
              type="text"
              value={userData.contact_Num}
              onChange={(e) => handleInputChange("contact_Num", e.target.value)}
            />
            <label>University:</label>
            <input
              type="text"
              value={userData.uni_Name}
              onChange={(e) => handleInputChange("uni_Name", e.target.value)}
            />
            <label>Bio:</label>
            <textarea
              value={userData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
            />
          </div>
        </div>

        <div className="skills-section">
          <h3>Skills</h3>
          <div>
            <h4>Skills I Offer:</h4>
            {userData.skillsTeach.map((skill, index) => (
              <div key={index} className="skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange("skillsTeach", index, e.target.value)}
                />
                <button onClick={() => handleSkillDelete("skillsTeach", index)}>Delete</button>
              </div>
            ))}
            <button onClick={() => handleSkillAdd("skillsTeach")}>Add Skill</button>
          </div>

          <div>
            <h4>Skills I Want to Learn:</h4>
            {userData.skillsLearn.map((skill, index) => (
              <div key={index} className="skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange("skillsLearn", index, e.target.value)}
                />
                <button onClick={() => handleSkillDelete("skillsLearn", index)}>Delete</button>
              </div>
            ))}
            <button onClick={() => handleSkillAdd("skillsLearn")}>Add Skill</button>
          </div>
        </div>

        <div className="button-group">
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
