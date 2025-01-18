import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const SkillsFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering feedbacks

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feedback/");
      setFeedbacks(response.data.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      alert("Failed to load feedbacks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Search feedbacks based on user name or comment
  const searchFeedbacks = () => {
    const filteredFeedbacks = feedbacks.filter(
      (feedback) =>
        feedback.userId?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.comment.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFeedbacks(filteredFeedbacks);
  };

  // Delete a feedback
  const deleteFeedback = async (feedbackId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/feedback/${feedbackId}`
      );
      if (response.data.success) {
        alert("Feedback deleted successfully!");
        setFeedbacks((prev) => prev.filter((fb) => fb._id !== feedbackId));
      } else {
        alert("Failed to delete feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Error deleting feedback. Please try again.");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="main-content">
      <h3>Skills Feedback</h3>

      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search feedbacks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchFeedbacks}>Search</button>
      </div>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : feedbacks.length > 0 ? (
        <table id="skills-feedback-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback._id}>
                <td>{index + 1}</td>
                <td>{feedback.userId?.fullName || "Anonymous"}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.comment || "No Comment"}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => deleteFeedback(feedback._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No feedbacks available.</p>
      )}
    </div>
  );
};

export default SkillsFeedback;
