import React from "react";
import "./styles.css";

const SkillsFeedback = () => {
  return (
    <div className="main-content">
      <h3>Skills Feedback</h3>
      <table id="skills-feedback-table">
        <thead>
          <tr>
            <th>Pic</th>
            <th>Name</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="https://via.placeholder.com/50" alt="User 1" /></td>
            <td>John Doe</td>
            <td>His JavaScript skills are excellent!</td>
            <td><button className="btn">Delete</button></td>
          </tr>
          {/* Add other rows here */}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsFeedback;
