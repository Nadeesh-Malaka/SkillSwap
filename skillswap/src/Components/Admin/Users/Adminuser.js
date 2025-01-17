import React, { useState } from "react";
import "./AdminHome.css";

const Adminuser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      profilePic: "path/to/profile1.jpg",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "(555) 123-4567",
      university: "UVA",
      bio: "I Am A SkillSwap User. I Love To Learn And Teach New Skills.",
    },
  ]);
  const [formState, setFormState] = useState({
    id: null,
    profilePic: "",
    name: "",
    email: "",
    phone: "",
    university: "",
    bio: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    alert(`User with ID ${id} deleted successfully!`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.id) {
      setUsers(
        users.map((user) =>
          user.id === formState.id ? { ...user, ...formState } : user
        )
      );
      alert(`User updated successfully!`);
    } else {
      setUsers([
        ...users,
        { ...formState, id: users.length + 1, profilePic: previewImage },
      ]);
      alert("New user added successfully!");
    }
    setFormState({
      id: null,
      profilePic: "",
      name: "",
      email: "",
      phone: "",
      university: "",
      bio: "",
    });
    setPreviewImage(null);
  };

  const handleEdit = (user) => {
    setFormState(user);
    setPreviewImage(user.profilePic);
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
        {/* Users Section */}
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
                  <th>Phone Number</th>
                  <th>University</th>
                  <th>Bio</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <img
                        src={user.profilePic}
                        alt="Profile Pic"
                        className="profile-pic"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.university}</td>
                    <td>{user.bio}</td>
                    <td>
                      <button className="btn" onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(user.id)}
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

        {/* Form Section */}
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
