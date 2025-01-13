import React, { useState } from "react";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (!userId) {
      alert("User not logged in. Please log in to add a skill.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.skillTitle);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("userId", userId); // Include userId in the request payload
    if (formData.file) {
      data.append("skill_pic", formData.file);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/skills", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Skill saved successfully!");
      console.log("Response:", response.data);

      // Clear form fields after successful submission
      setFormData({
        skillTitle: "",
        category: "technology",
        description: "",
        file: null,
      });
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill. Please try again.");
    }
  };

  const handleCancel = () => {
    alert("Form submission canceled.");
  };

  return (
    <div>
      <Nav />

      <main className="skill-listing">
        <section className="skill-form">
          <h1>Skill Listing Form</h1>
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
              <option value="creative">Creative Arts & Design</option>
              <option value="personal">Personal Development</option>
              <option value="hobbies">Hobbies & Lifestyle</option>
              <option value="business">Business & Entrepreneurship</option>
              <option value="marketing">Marketing & Sales</option>
              <option value="languages">Languages</option>
              <option value="music">Music & Audio</option>
              <option value="fitness">Fitness & Wellness</option>
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
              <button type="submit">Save Skill</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SkillListing;
