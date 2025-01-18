import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]); // State to store contact details
  const [filteredContacts, setFilteredContacts] = useState([]); // State for filtered contacts based on search
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch contact messages from backend
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/contact"); // Replace with your API endpoint
      setContacts(response.data.data); // Assuming the data is in response.data.data
      setFilteredContacts(response.data.data); // Set initial filtered contacts to all contacts
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter contacts based on the search query
  const searchContacts = () => {
    const query = searchQuery.toLowerCase();
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered); // Set filtered contacts
  };

  // Delete a contact message
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`); // Replace with your API endpoint
      setContacts(contacts.filter((contact) => contact._id !== id));
      setFilteredContacts(filteredContacts.filter((contact) => contact._id !== id)); // Update filtered contacts as well
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

      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchContacts}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table id="contact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, index) => (
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
