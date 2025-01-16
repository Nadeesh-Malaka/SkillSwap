import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./feedbackForm.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const skillId = searchParams.get("skillId");
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !skillId) {
      setError("Please provide a rating and ensure a valid skill is selected.");
      setSuccessMessage("");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/feedback", {
        skillId,
        userId,
        rating,
        comment,
      });
      setSuccessMessage("Feedback submitted successfully!");
      setError("");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Nav />
      <main className="feedback-main">
        <div className="feedback-container">
          <h2>Submit Feedback</h2>
          {error && <div className="error-message">{error}</div>}
          {successMessage && (
            <div
              className="success-message"
              style={{
                color: "green",
                backgroundColor: "#d1e7dd",
                padding: "10px",
                border: "1px solid #badbcc",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="feedback-form">
            <label htmlFor="rating">Rating (1-5):</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              required
            />
            <label htmlFor="comment">Comment (Optional):</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
            ></textarea>
            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackForm;
