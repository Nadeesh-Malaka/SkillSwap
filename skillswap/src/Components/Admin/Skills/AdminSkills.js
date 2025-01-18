import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminSkills.css"; // Include styles for AdminSkills

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // For the search input
  const [loading, setLoading] = useState(false); // Loading state for search results

  // Fetch all skills initially
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/skills");
      setSkills(response.data.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      alert("Failed to fetch skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Search skills based on a query
  const searchSkills = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/skills/search/${searchQuery}`
      );
      setSkills(response.data.data);
    } catch (error) {
      console.error("Error searching skills:", error);
      alert("Failed to search skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Approve a skill
  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/skills/${id}/approve`);
      alert("Skill approved successfully!");
      fetchSkills(); // Refresh the list
    } catch (error) {
      console.error("Error approving skill:", error);
      alert("Failed to approve skill. Please try again.");
    }
  };

  // Reject a skill
  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/skills/${id}/reject`);
      alert("Skill rejected successfully!");
      fetchSkills(); // Refresh the list
    } catch (error) {
      console.error("Error rejecting skill:", error);
      alert("Failed to reject skill. Please try again.");
    }
  };

  // Delete a skill
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/skills/${id}`);
      alert("Skill deleted successfully!");
      fetchSkills(); // Refresh the list
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill. Please try again.");
    }
  };

  useEffect(() => {
    fetchSkills(); // Load all skills on component mount
  }, []);

  return (
    <div className="admin-skills-container">
      <h1>Admin Skills Management</h1>
      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search skills by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchSkills}>Search Skills</button>
      </div>

      {/* Skills Table */}
      {loading ? (
        <p>Loading...</p>
      ) : skills.length === 0 ? (
        <p>No skills found. Try a different search.</p>
      ) : (
        <table className="skills-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id}>
                <td>{skills.indexOf(skill) + 1}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${skill.skill_pic || "images/default_skill.png"}`}
                    alt={skill.title}
                    className="skill-image"
                  />
                </td>
                <td>{skill.title}</td>
                <td>{skill.category}</td>
                <td>
                  <span
                    className={`status ${
                      skill.isApproved ? "approved" : "not-approved"
                    }`}
                  >
                    {skill.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(skill._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(skill._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(skill._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSkills;
