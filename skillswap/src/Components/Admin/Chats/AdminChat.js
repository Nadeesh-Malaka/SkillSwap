import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminChat.css";

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
    try {
      await axios.delete(`http://localhost:5000/api/chat/${chatId}`);
      alert("Chat message deleted successfully!");
      fetchChats();
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Failed to delete chat message.");
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.skillTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="admin-chat-container">
      <h1>Admin Chat Management</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by skill title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading chats...</p>
      ) : filteredChats.length === 0 ? (
        <p>No chats found.</p>
      ) : (
        <table className="chat-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Skill Image</th>
              <th>Skill Title</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChats.map((chat, index) => (
              <tr key={chat._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${chat.skillImage}`}
                    alt="Skill"
                    className="skill-image"
                  />
                </td>
                <td>{chat.skillTitle}</td>
                <td>{chat.message}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(chat._id)}
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

export default AdminChat;
