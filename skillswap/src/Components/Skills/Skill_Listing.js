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
      setSkills(response.data.data.filter((skill) => skill.userId === userId)); // Only user's skills
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      alert("Error fetching skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

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

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      skillTitle: skill.title,
      category: skill.category,
      description: skill.description,
      file: null,
    });
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
