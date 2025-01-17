import React from "react";
import "./styles.css";

const AdminContact = () => {
  return (
    <div className="main-content">
      <h3>Contact</h3>
      <table id="contact-table">
        <thead>
          <tr>
            <th>Pic</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="https://via.placeholder.com/50" alt="User 1" /></td>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>Can you provide more details about your service?</td>
            <td>
              <a
                href="reply.html?email=john.doe@example.com&message=Can you provide more details about your service?"
                className="btn"
              >
                Reply
              </a>
            </td>
          </tr>
          {/* Add other rows here */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContact;
