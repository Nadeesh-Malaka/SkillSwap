import React from "react";
import "./styles.css";

const AdminChat = () => {
  return (
    <div className="main-content">
      <h3>Chat</h3>
      <table id="chat-table">
        <thead>
          <tr>
            <th>Pic</th>
            <th>Name</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="https://via.placeholder.com/50" alt="User 1" /></td>
            <td>John Doe</td>
            <td>Hello, I need help with my account!</td>
            <td><button className="btn">Delete</button></td>
          </tr>
          {/* Add other rows here */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminChat;
