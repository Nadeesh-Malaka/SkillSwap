import React, { useState } from "react";
import "./feedbackForm.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

const FeedbackForm = ({ skills = [] }) => { // Default value for `skills`
  const [skillId, setSkillId] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skillId || !rating) {
      setError("Please select a skill and provide a rating.");
      return;
    }

    alert("Feedback submitted successfully!");
    setSkillId("");
    setRating(0);
    setComment("");
    setError("");
  };

  return (
    <div>
      <Nav />
      <main className="feedback-main">
        <div className="feedback-container">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            {error && <div className="error-message">{error}</div>}

            {/* Skill Selection */}
            <label htmlFor="skill">Skill:</label>
            <select
              id="skill"
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
              required
            >
              <option value="">Select a skill</option>
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No skills available
                </option>
              )}
            </select>

            {/* Rating Input */}
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

            {/* Comment Input */}
            <label htmlFor="comment">Comment (Optional):</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
            ></textarea>

            {/* Submit Button */}
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
