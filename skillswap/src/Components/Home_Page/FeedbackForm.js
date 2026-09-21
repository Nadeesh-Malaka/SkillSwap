import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./feedbackForm.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import { Star } from "lucide-react";

import { API_BASE_URL } from "../../config";
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
    if (!rating || !skillId) { setError("Please provide a rating and ensure a valid skill is selected."); setSuccessMessage(""); return; }
    try {
      await axios.post(`${API_BASE_URL}/api/feedback`, { skillId, userId, rating, comment });
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
          <p className="feedback-subtitle">Rate your skill exchange experience.</p>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="feedback-form">
            <label>Your Rating</label>
            <div className="star-rating">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${rating >= star ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  aria-label={`${star} star`}
                >
                  <Star size={32} fill={rating >= star ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              ))}
            </div>

            <label htmlFor="comment">Comment (Optional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience about this skill exchange..."
            ></textarea>

            <button type="submit" className="submit-btn">Submit Feedback</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackForm;




