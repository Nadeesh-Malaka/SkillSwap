import React, { useState, useEffect } from "react";
import axios from "axios";
import userImage from "./profile.png";
import "./Profile.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import { Camera } from "lucide-react";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [teachInput, setTeachInput] = useState('');
  const [learnInput, setLearnInput] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) { setError("User ID not found. Please log in."); setLoading(false); return; }
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const user = response.data;
        setUserData({ ...user, profile_pic: user.profile_pic || userImage, skillsTeach: user.sk_Teach || [], skillsLearn: user.sk_Learn || [] });
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => setUserData({ ...userData, [field]: value });

  const handleSkillDelete = (skillType, skill) => {
    setUserData({ ...userData, [skillType]: userData[skillType].filter(s => s !== skill) });
  };

  const handleSkillAdd = (skillType, input, setInput) => {
    if (input.trim() && !userData[skillType].includes(input.trim())) {
      setUserData({ ...userData, [skillType]: [...userData[skillType], input.trim()] });
    }
    setInput('');
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onload = () => setUserData({ ...userData, profile_pic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) { setError("User ID not found. Please log in."); return; }
      await axios.put(`http://localhost:5000/api/users/${userId}`, {
        fullName: userData.fullName, contact_Num: userData.contact_Num,
        uni_Name: userData.uni_Name, bio: userData.bio,
        sk_Learn: userData.skillsLearn, sk_Teach: userData.skillsTeach,
      });
      if (profilePicFile) {
        const formData = new FormData();
        formData.append("profile_pic", profilePicFile);
        await axios.put(`http://localhost:5000/api/users/${userId}/profile-pic`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      }
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    }
  };

  if (loading) return (<div><Nav /><div className="profile-loading">Loading profile...</div><Footer /></div>);
  if (error) return (<div><Nav /><div className="profile-error">{error}</div><Footer /></div>);

  const picSrc = userData.profile_pic && userData.profile_pic.startsWith('data:')
    ? userData.profile_pic
    : `http://localhost:5000/${userData.profile_pic}`;

  return (
    <div>
      <Nav />
      <div className="profile-page">
        <div className="profile-inner">
          <div className="profile-page-header"><h1>My Profile</h1></div>

          <div className="profile-layout">
            <div className="profile-avatar-card">
              <div className="profile-pic-wrapper">
                <img src={picSrc} alt="Profile" className="profile-pic1" />
                <div className="profile-pic-overlay" onClick={() => document.getElementById("profile-pic-input").click()}>
                  <Camera size={16} style={{marginRight: 4}} /> Change
                </div>
                <input type="file" id="profile-pic-input" accept="image/*" style={{ display: "none" }} onChange={handleProfilePicChange} />
              </div>
              <div className="profile-avatar-name">{userData.fullName}</div>
              <div className="profile-avatar-email">{userData.email}</div>
            </div>

            <div className="profile-details-card">
              <div className="profile-section-title">Personal Information</div>
              <div className="profile-fields-grid">
                <div className="profile-form-group">
                  <label>Full Name</label>
                  <input type="text" value={userData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} />
                </div>
                <div className="profile-form-group">
                  <label>Email (read-only)</label>
                  <input type="text" value={userData.email} readOnly />
                </div>
                <div className="profile-form-group">
                  <label>Contact Number</label>
                  <input type="text" value={userData.contact_Num || ''} onChange={(e) => handleInputChange("contact_Num", e.target.value)} />
                </div>
                <div className="profile-form-group">
                  <label>University</label>
                  <input type="text" value={userData.uni_Name || ''} onChange={(e) => handleInputChange("uni_Name", e.target.value)} />
                </div>
                <div className="profile-form-group full">
                  <label>Bio</label>
                  <textarea value={userData.bio || ''} onChange={(e) => handleInputChange("bio", e.target.value)} placeholder="Tell others about yourself..." />
                </div>
              </div>

              <div className="profile-skills-section">
                <div className="profile-section-title" style={{borderBottom: '1px solid var(--border)', paddingBottom: 12, marginBottom: 20}}>Skills</div>

                <div style={{marginBottom: 24}}>
                  <div className="profile-skills-title">Skills I Can Teach</div>
                  <div className="profile-skills-chips">
                    {userData.skillsTeach.map((skill, i) => (
                      <span key={i} className="profile-skill-chip">
                        {skill}
                        <button onClick={() => handleSkillDelete("skillsTeach", skill)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="profile-skill-input-row">
                    <input type="text" placeholder="Add a skill..." value={teachInput} onChange={e => setTeachInput(e.target.value)}
                      onKeyPress={e => { if(e.key === 'Enter') { e.preventDefault(); handleSkillAdd('skillsTeach', teachInput, setTeachInput); }}} />
                    <button className="profile-add-skill-btn" onClick={() => handleSkillAdd('skillsTeach', teachInput, setTeachInput)}>+ Add</button>
                  </div>
                </div>

                <div>
                  <div className="profile-skills-title">Skills I Want to Learn</div>
                  <div className="profile-skills-chips">
                    {userData.skillsLearn.map((skill, i) => (
                      <span key={i} className="profile-skill-chip">
                        {skill}
                        <button onClick={() => handleSkillDelete("skillsLearn", skill)}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className="profile-skill-input-row">
                    <input type="text" placeholder="Add a skill..." value={learnInput} onChange={e => setLearnInput(e.target.value)}
                      onKeyPress={e => { if(e.key === 'Enter') { e.preventDefault(); handleSkillAdd('skillsLearn', learnInput, setLearnInput); }}} />
                    <button className="profile-add-skill-btn" onClick={() => handleSkillAdd('skillsLearn', learnInput, setLearnInput)}>+ Add</button>
                  </div>
                </div>
              </div>

              <button className="profile-save-btn" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
