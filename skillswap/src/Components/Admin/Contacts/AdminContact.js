import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Reply, Trash2 } from "lucide-react";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/contact");
      setContacts(response.data.data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact message:", error);
    }
  };

  const replyToContact = (email, message) => {
    const mailtoLink = `mailto:${email}?subject=Reply to your message&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink, "_blank");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchQuery.toLowerCase())
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
                placeholder="Search by name, email, or message..." 
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
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>Loading inquiries...</div>
        ) : filteredContacts.length === 0 ? (
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>No contact inquiries found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td style={{fontWeight: 500}}>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td><div style={{maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{contact.message}</div></td>
                  <td>
                    <div style={{display: 'flex', gap: 8}}>
                      <button className="btn" style={{padding: '4px 8px', color: 'var(--primary)', borderColor: 'var(--primary)'}} onClick={() => replyToContact(contact.email, contact.message)}>
                        <Reply size={14} />
                      </button>
                      <button className="btn btn-danger" style={{padding: '4px 8px'}} onClick={() => deleteContact(contact._id)}>
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

export default AdminContact;
