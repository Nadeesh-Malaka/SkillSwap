import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Trash2, Star } from "lucide-react";

const SkillsFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const deleteFeedback = async (feedbackId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`);
      if (response.data.success) {
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

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.userId?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-section-card">
      <div className="admin-section-header">
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div className="admin-search" style={{padding: 0, border: 'none'}}>
            <div style={{position: 'relative'}}>
              <Search size={16} color="var(--text-secondary)" style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)'}} />
              <input 
                type="text" 
                placeholder="Search feedbacks..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                style={{paddingLeft: 34}} 
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{overflowX: 'auto'}}>
        {loading ? (
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>Loading feedbacks...</div>
        ) : filteredFeedbacks.length === 0 ? (
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>No feedbacks available.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td style={{fontWeight: 500}}>{feedback.userId?.fullName || "Anonymous"}</td>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B'}}>
                      <span>{feedback.rating}</span> <Star size={14} fill="#F59E0B" />
                    </div>
                  </td>
                  <td><div style={{maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{feedback.comment || "No Comment"}</div></td>
                  <td>
                    <button className="btn btn-danger" style={{padding: '4px 8px'}} onClick={() => deleteFeedback(feedback._id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SkillsFeedback;
