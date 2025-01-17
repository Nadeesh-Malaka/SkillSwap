import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]); // State to store contact details
  const [loading, setLoading] = useState(true);

  // Fetch contact messages from backend
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/contact"); // Replace with your API endpoint
      setContacts(response.data.data); // Assuming the data is in response.data.data
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact message
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`); // Replace with your API endpoint
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact message:", error);
    }
  };

  // Open Gmail with pre-filled email and message
  const replyToContact = (email, message) => {
    const mailtoLink = `mailto:${email}?subject=Reply to your message&body=${encodeURIComponent(
      message
    )}`;
    window.open(mailtoLink, "_blank");
  };

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="main-content">
      <h3>Contact</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table id="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td>{index + 1}</td> {/* Incremental ID starting from 1 */}
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <button
                    className="btn reply-btn"
                    onClick={() => replyToContact(contact.email, contact.message)}
                  >
                    Reply
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteContact(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContact;
