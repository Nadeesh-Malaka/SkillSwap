import React from "react";
import "./styles.css";

const UserFeedback = () => {
  return (
    <div className="main-content">
      <h3>User Feedback</h3>
      <table id="skills-feedback-table">
        <thead>
          <tr>
          <th>ID</th>
            <th>User</th>
            <th>Feedback</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Feedback Data */}
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>The platform is user-friendly, but needs better search functionality.</td>
            
            <td>
              <button className="btn">Reject</button>
              <button className="btn">Delete</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>I love the design, but the loading time is a bit slow.</td>
            
            <td>
              <button className="btn">Approve</button>
              <button className="btn">Delete</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Michael Brown</td>
            <td>Great support, but I had trouble finding the FAQ section.</td>
            
            <td>
              <button className="btn">Approve</button>
              <button className="btn">Reject</button>
              <button className="btn">Delete</button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Emily Johnson</td>
            <td>
              The overall experience was excellent, but I would suggest adding more tutorials.
            </td>
            
            <td>
              <button className="btn">Reject</button>
              <button className="btn">Delete</button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Daniel Lee</td>
            <td>The navigation can be improved, as it's a bit confusing for new users.</td>
            
            <td>
              <button className="btn">Approve</button>
              <button className="btn">Reject</button>
              <button className="btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserFeedback;
