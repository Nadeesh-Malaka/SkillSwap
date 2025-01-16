import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Skill_Feedback.css";

function Skill_Feedback() {
  const [skills, setSkills] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // Fetch user's skills
  const fetchSkills = async () => {
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

  // Fetch feedbacks for each skill
  const fetchFeedbacks = async (skillId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/feedback/${skillId}`
      );
      setFeedbacks((prev) => ({
        ...prev,
        [skillId]: response.data.data,
      }));
    } catch (error) {
      console.error(`Error fetching feedback for skill ${skillId}:`, error);
    }
  };

  // Delete feedback
  const deleteFeedback = async (feedbackId, skillId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/feedback/${feedbackId}`
      );
      if (response.data.success) {
        alert("Feedback deleted successfully!");
        // Update the feedback list for the skill
        setFeedbacks((prev) => ({
          ...prev,
          [skillId]: prev[skillId].filter(
            (feedback) => feedback._id !== feedbackId
          ),
        }));
      } else {
        alert("Failed to delete feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Error deleting feedback. Please try again.");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    skills.forEach((skill) => fetchFeedbacks(skill._id));
  }, [skills]);

  return (
    <div className="skill-feedback-container">
      <h1>Skill Feedback</h1>
      {loading ? (
        <p className="loading-message">Loading skills and feedback...</p>
      ) : skills.length > 0 ? (
        skills.map((skill) => (
          <div key={skill._id} className="feedback-section">
            {feedbacks[skill._id] === undefined ? (
              <p className="loading-message">Loading feedback...</p>
            ) : feedbacks[skill._id].length > 0 ? (
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th>Skill Name</th>
                    <th>Skill Picture</th>
                    <th>Rating UserName</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks[skill._id].map((feedback) => (
                    <tr key={feedback._id}>
                      <td>{skill.title}</td>
                      <td>
                        {skill.skill_pic && (
                          <img
                            src={`http://localhost:5000/${skill.skill_pic}`}
                            alt="Skill"
                            className="skill-image"
                          />
                        )}
                      </td>
                      <td>{feedback.userId?.fullName || "Anonymous"}</td>
                      <td>{feedback.rating}</td>
                      <td>{feedback.comment}</td>
                      <td>
                        <button
                          className="delete-feedback-button"
                          onClick={() => deleteFeedback(feedback._id, skill._id)}
                        >
                          Delete Feedback
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              null // No message displayed here if no feedback exists
            )}
          </div>
        ))
      ) : (
        <p>No skills found. Please add some skills.</p>
      )}
    </div>
  );
}

export default Skill_Feedback;
