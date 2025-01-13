import React from "react";
import "./style.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

function SkillListing() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Skill saved successfully!");
  };

  const handleCancel = () => {
    alert("Form submission canceled.");
  };

  return (
    <div>
      <Nav />

      <main className="skill-listing">
        <section className="skill-form">
          <h1>Skill Listing Page</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="skillTitle">Skill Title:</label>
            <input
              type="text"
              id="skillTitle"
              name="skillTitle"
              placeholder="Enter your skill title"
              required
            />

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" required>
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
              required
            ></textarea>

            <label htmlFor="fileUpload">Upload a File:</label>
            <input type="file" id="fileUpload" name="fileUpload" />

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
