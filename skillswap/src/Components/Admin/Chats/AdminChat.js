import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Trash2 } from "lucide-react";

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/chat/all");
      setChats(response.data.chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      alert("Failed to fetch chat messages.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/chat/${chatId}`);
        fetchChats();
      } catch (error) {
        console.error("Error deleting chat:", error);
        alert("Failed to delete chat message.");
      }
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.skillTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="admin-section-card">
      <div className="admin-section-header">
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div className="admin-search" style={{padding: 0, border: 'none'}}>
            <div style={{position: 'relative'}}>
              <Search size={16} color="var(--text-secondary)" style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)'}} />
              <input 
                type="text" 
                placeholder="Search by skill title..." 
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
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>Loading chats...</div>
        ) : filteredChats.length === 0 ? (
          <div style={{padding: 40, textAlign: 'center', color: 'var(--text-secondary)'}}>No chats found.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Skill Image</th>
                <th>Skill Title</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredChats.map((chat) => (
                <tr key={chat._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/${chat.skillImage}`}
                      alt="Skill"
                      style={{width: 48, height: 32, borderRadius: 4, objectFit: 'cover', border: '1px solid var(--border)'}}
                    />
                  </td>
                  <td style={{fontWeight: 500}}>{chat.skillTitle}</td>
                  <td>{chat.message}</td>
                  <td>
                    <button className="btn btn-danger" style={{padding: '4px 8px'}} onClick={() => handleDelete(chat._id)}>
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

export default AdminChat;
