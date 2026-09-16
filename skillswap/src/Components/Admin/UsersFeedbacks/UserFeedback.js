import React, { useState } from "react";
import { Search, Trash2, Star, Check } from "lucide-react";

const UserFeedback = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // The original application used static mock data for User Feedback
  // since there is no backend endpoint for it. We are preserving that data here.
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      user: "John Doe",
      feedback: "The platform is user-friendly, but needs better search functionality.",
      status: "pending"
    },
    {
      id: 2,
      user: "Jane Smith",
      feedback: "I love the design, but the loading time is a bit slow.",
      status: "approved"
    },
    {
      id: 3,
      user: "Michael Brown",
      feedback: "Great support, but I had trouble finding the FAQ section.",
      status: "pending"
    },
    {
      id: 4,
      user: "Emily Johnson",
      feedback: "The overall experience was excellent, but I would suggest adding more tutorials.",
      status: "rejected"
    },
    {
      id: 5,
      user: "Daniel Lee",
      feedback: "The navigation can be improved, as it's a bit confusing for new users.",
      status: "pending"
    }
  ]);

  const deleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter(fb => fb.id !== id));
  };

  const approveFeedback = (id) => {
    setFeedbacks(feedbacks.map(fb => fb.id === id ? { ...fb, status: "approved" } : fb));
  };

  const filteredFeedbacks = feedbacks.filter((fb) =>
    fb.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fb.feedback.toLowerCase().includes(searchQuery.toLowerCase())
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
        {filteredFeedbacks.length === 0 ? (
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>No feedbacks available.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((fb) => (
                <tr key={fb.id}>
                  <td style={{fontWeight: 500}}>{fb.user}</td>
                  <td><div style={{maxWidth: 350, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{fb.feedback}</div></td>
                  <td>
                    <span style={{
                      background: fb.status === 'approved' ? 'var(--success-light)' : fb.status === 'rejected' ? 'var(--danger-light)' : 'var(--warning-light)',
                      color: fb.status === 'approved' ? 'var(--success)' : fb.status === 'rejected' ? 'var(--danger)' : '#d97706',
                      padding: '2px 8px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize'
                    }}>
                      {fb.status}
                    </span>
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: 8}}>
                      {fb.status !== 'approved' && (
                        <button className="btn" style={{padding: '4px 8px', color: 'var(--success)', borderColor: 'var(--success)'}} onClick={() => approveFeedback(fb.id)}>
                          <Check size={14} />
                        </button>
                      )}
                      <button className="btn btn-danger" style={{padding: '4px 8px'}} onClick={() => deleteFeedback(fb.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
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

export default UserFeedback;
