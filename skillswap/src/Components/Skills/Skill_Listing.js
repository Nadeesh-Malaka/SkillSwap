import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function SkillListing() {
  const [formData, setFormData] = useState({
    skillTitle: "",
    category: "technology",
    description: "",
    file: null,
  });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [requests, setRequests] = useState([]);

  // Fetch skills owned by the logged-in user
  const fetchSkills = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in to view your skills.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/skills?userId=${userId}`
      );
      setSkills(response.data.data.filter((skill) => skill.userId === userId));
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      alert("Error fetching skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch requests for skills owned by the logged-in user
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/requests`);
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
    fetchRequests();
  }, []);

  // Approve a request and open chat URL
  const handleApprove = async (requestId) => {
    try {
      const response = await axios.patch("http://localhost:5000/api/requests", {
        requestId,
        isAccepted: true,
      });
      const { chatURL } = response.data.request;

      alert("Request approved!");
      if (chatURL) {
        window.open(chatURL, "_blank"); // Open chat URL in a new tab
      }
      fetchRequests();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Submit form to add or update a skill
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in to add a skill.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.skillTitle);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("userId", userId);
    if (formData.file) {
      data.append("skill_pic", formData.file);
    }

    try {
      const url = editingSkill
        ? `http://localhost:5000/api/skills/${editingSkill._id}`
        : "http://localhost:5000/api/skills";
      const method = editingSkill ? "put" : "post";

      await axios[method](url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        editingSkill
          ? "Skill updated successfully!"
          : "Skill added successfully!"
      );
      setFormData({
        skillTitle: "",
        category: "technology",
        description: "",
        file: null,
      });
      setEditingSkill(null);
      fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill. Please try again.");
    }
  };

  // Delete a skill
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete(`http://localhost:5000/api/skills/${id}`);
        alert("Skill deleted successfully!");
        fetchSkills();
      } catch (error) {
        console.error("Error deleting skill:", error);
        alert("Failed to delete skill. Please try again.");
      }
    }
  };

  // Edit a skill
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      skillTitle: skill.title,
      category: skill.category,
      description: skill.description,
      file: null,
    });
  };

  // Approve the request and update the skill status to accepted
  const approveRequest = async (skillId) => {
    try {
      // Step 1: Fetch skill request details by skillId
      const skillReqResponse = await axios.get(
        `http://localhost:5000/api/requests/skill/${skillId}`
      );
      const skillRequest = skillReqResponse.data.requests[0]; // Assuming the first request matches

      if (!skillRequest || !skillRequest._id) {
        alert("Skill request not found!");
        return;
      }

      // Step 2: Update the skill request status to isAccepted: true
      const response = await axios.patch(
        "http://localhost:5000/api/requests/status",
        {
          requestId: skillRequest._id, // Use the fetched request ID
          isAccepted: true,
        }
      );

      if (response.data.success) {
        // Step 3: Update the UI to reflect the approved request
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill._id === skillId
              ? {
                  ...skill,
                  isApproved: true,
                  chatURL: skillRequest.chatURL, // Add chat URL to the skill
                }
              : skill
          )
        );

        alert("Request approved successfully!");
      } else {
        alert("Failed to approve the request.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      alert("An error occurred while approving the request.");
    }
  };

  return (
    <div>
      <Nav />
      <main className="skill-listing">
        <section className="skill-form">
          <h1>{editingSkill ? "Edit Skill" : "Skill Listing Form"}</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="skillTitle">Skill Title:</label>
            <input
              type="text"
              id="skillTitle"
              name="skillTitle"
              placeholder="Enter your skill title"
              value={formData.skillTitle}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {/* Options for categories */}
              <option value="technology">Technology & Programming</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="art">Art & Creativity</option>
              <option value="business">Business</option>
              <option value="science">Science</option>
              <option value="gaming">Gaming</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Enter skill description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>

            <label htmlFor="fileUpload">Upload a File:</label>
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              onChange={handleFileChange}
            />

            <div className="button-group">
              <button type="submit">
                {editingSkill ? "Update Skill" : "Save Skill"}
              </button>
              {editingSkill && (
                <button type="button" onClick={() => setEditingSkill(null)}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="skill-list">
          <h2>My Skills</h2>
          {loading ? (
            <p>Loading...</p>
          ) : skills.length === 0 ? (
            <p>No skills found. Add some skills!</p>
          ) : (
            <table className="skill-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Message Req</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill._id}>
                    <td>{skill.title}</td>
                    <td>{skill.category}</td>
                    <td>{skill.description}</td>
                    <td>
                      {skill.skill_pic && (
                        <img
                          src={`http://localhost:5000/${skill.skill_pic}`}
                          alt="Skill"
                          className="skill-image"
                        />
                      )}
                    </td>
                    <td>
                      <span
                        className={`status ${
                          skill.isApproved ? "approved" : "not-approved"
                        }`}
                      >
                        {skill.isApproved ? "Approved" : "Not Approved"}
                      </span>
                    </td>
                    <td>
                      <div key={skill._id}>
                        {skill.isRequest ? (
                          skill.isApproved && skill.chatURL ? (
                            // Show the "Open Chat" button with a valid chat URL
                            <a
                              href={skill.chatURL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button  className="chat-button">Open Chat</button>
                            </a>
                          ) : (
                            // Show the "Approve Request" button if not yet approved
                            <button onClick={() => approveRequest(skill._id)}>
                              Approve Request
                            </button>
                          )
                        ) : (
                          // If the skill is not requested
                          <span>Not requested yet</span>
                        )}
                      </div>
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(skill)}
                      >
                        Edit
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
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SkillListing;
