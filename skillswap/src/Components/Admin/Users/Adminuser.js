import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHome.css";

const Adminuser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState({
    id: null,
    profilePic: null,
    name: "",
    email: "",
    phone: "",
    university: "",
    bio: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users.");
    }
  };

  const handleSearch = async () => {
    try {
      const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert(`User deleted successfully!`);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formState.id) {
        // Update user
        const updatedUser = {
          fullName: formState.name,
          contact_Num: formState.phone,
          uni_Name: formState.university,
          bio: formState.bio,
        };

        await axios.put(
          `http://localhost:5000/api/users/${formState.id}`,
          updatedUser
        );

        if (formState.profilePic) {
          const formData = new FormData();
          formData.append("profile_pic", formState.profilePic);

          await axios.put(
            `http://localhost:5000/api/users/${formState.id}/profile-pic`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        }
        alert("User updated successfully!");
      } else {
        // Add new user
        const newUser = {
          email: formState.email,
          password: "password123", // Default password
          fullName: formState.name,
          contact_Num: formState.phone,
          uni_Name: formState.university,
          bio: formState.bio,
        };

        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          newUser
        );

        if (formState.profilePic) {
          const formData = new FormData();
          formData.append("profile_pic", formState.profilePic);

          await axios.put(
            `http://localhost:5000/api/users/${response.data.user._id}/profile-pic`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        }

        alert("New user added successfully!");
      }

      fetchUsers();
      setFormState({
        id: null,
        profilePic: null,
        name: "",
        email: "",
        phone: "",
        university: "",
        bio: "",
      });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user.");
    }
  };

  const handleEdit = (user) => {
    setFormState({
      id: user._id,
      profilePic: null,
      name: user.fullName,
      email: user.email,
      phone: user.contact_Num,
      university: user.uni_Name,
      bio: user.bio,
    });
    setPreviewImage(`http://localhost:5000/${user.profile_pic}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormState({ ...formState, profilePic: file });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-main-content">
        <div className="users-section">
          <div className="header">
            <h3>Users</h3>
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search-box"
              placeholder="Search Users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="table-container">
            <table id="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile Pic</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>University</th>
                  <th>Bio</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>{" "}
                    {/* Displaying serial numbers starting from 1 */}
                    <td>
                      <img
                        src={`http://localhost:5000/${user.profile_pic}`}
                        alt="Profile Pic"
                        className="profile-pic"
                      />
                    </td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.contact_Num}</td>
                    <td>{user.uni_Name}</td>
                    <td>{user.bio}</td>
                    <td>
                      <button className="btn" onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="form-container">
          <h4>{formState.id ? "Edit User" : "Add User"}</h4>
          <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileChange} />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="profile-preview"
              />
            )}
            <input
              type="text"
              placeholder="Name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={formState.phone}
              onChange={(e) =>
                setFormState({ ...formState, phone: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="University"
              value={formState.university}
              onChange={(e) =>
                setFormState({ ...formState, university: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Bio"
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
              required
            />
            <button type="submit" className="btn">
              {formState.id ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminuser;
