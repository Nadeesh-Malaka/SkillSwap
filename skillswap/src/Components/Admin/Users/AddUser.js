import React, { useState } from "react";
import "./AdminHome.css";

const AddUser = () => {
  const [userDetails, setUserDetails] = useState({
    id: "",
    profilePic: null,
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserDetails({ ...userDetails, profilePic: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.rePassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("User added successfully!");
    console.log("User Details:", userDetails);
    // Submit the form logic here
  };

  return (
    <div className="main-content">
      <h3 className="page-title">Add New User</h3>
      <form id="add-user-form" onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="user-id">ID:</label>
          <input
            type="text"
            id="user-id"
            name="id"
            value={userDetails.id}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="profile-pic">Profile Picture:</label>
          <input
            type="file"
            id="profile-pic"
            name="profilePic"
            onChange={handleFileChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

       
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="re-password">Re-enter Password:</label>
          <input
            type="password"
            id="re-password"
            name="rePassword"
            value={userDetails.rePassword}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="btn submit-btn">
          Add User
        </button>
        <p></p>
      </form>
    </div>
  );
};

export default AddUser;

