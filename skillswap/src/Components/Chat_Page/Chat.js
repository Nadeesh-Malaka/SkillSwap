import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "./Chat.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import { MessageCircle } from "lucide-react";

const Chat = () => {
  const { skillId, userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState("");
  const [skillTitle, setSkillTitle] = useState("");

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const skillResponse = await axios.get(`http://localhost:5000/api/skills/${skillId}`);
        const skillOwnerId = skillResponse.data.userId;
        setReceiverId(skillOwnerId);
        setSkillTitle(skillResponse.data.title || "Skill Chat");
        const messagesResponse = await axios.get(`http://localhost:5000/api/chat/${skillId}/${userId}`);
        setMessages(messagesResponse.data.messages);
      } catch (err) {
        console.error("Error fetching chat details:", err);
        setError("Failed to load chat details.");
      }
    };
    fetchChatDetails();
  }, [skillId, userId]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.emit("joinRoom", { skillId, userId });
    newSocket.on("message", (newMessage) => { setMessages((prev) => [...prev, newMessage]); });
    return () => { newSocket.disconnect(); };
  }, [skillId, userId]);

  const sendMessage = async () => {
    if (!message.trim()) { setError("Message cannot be empty."); return; }
    const newMessage = { skillId, senderId: userId, receiverId, message };
    try {
      await axios.post("http://localhost:5000/api/chat/send", newMessage);
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      setError("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") sendMessage(); };

  return (
    <div>
      <Nav />
      <div className="chat-page-wrapper">
        <div className="chat-container">
          <div className="chat-sidebar">
            <div className="chat-sidebar-title">Active Chat</div>
            <div className="chat-sidebar-skill">{skillTitle}</div>
            <div className="chat-sidebar-id">Skill ID: {skillId}</div>
            <div className="chat-sidebar-divider" />
            <div><span className="chat-status-dot" /><span className="chat-status-text">Connected</span></div>
          </div>

          <div className="chat-main">
            <div className="chat-header">
              <h2 style={{display: 'flex', alignItems: 'center', gap: 8}}><MessageCircle size={20} /> {skillTitle}</h2>
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.senderId === userId ? "sent" : "received"}`}>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>

            <div className="input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="message-input"
              />
              <button onClick={sendMessage} className="send-button">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
