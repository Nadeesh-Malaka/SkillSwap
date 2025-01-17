import React, { useState } from "react";
import "./AdminHome.css"; 

const EditUser = ({ user }) => {
  const [userDetails, setUserDetails] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User details updated successfully!");
    console.log("Updated User Details:", userDetails);
    // Update user logic or redirection can go here.
  };

  return (
    <div className="form-container">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePic"
            value={userDetails.profilePic}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>University:</label>
          <input
            type="text"
            name="university"
            value={userDetails.university}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={userDetails.bio}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
