import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "./Chat.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";
import { MessageCircle, User } from "lucide-react";

const Chat = () => {
  const { skillId, userId } = useParams(); // userId is the URL param (student/initator ID)
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState("");
  const [skillTitle, setSkillTitle] = useState("");
  
  // Current logged-in user
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Decode token to get current user info
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(decoded.id);
        
        // Fetch current user details to get fullName
        axios.get(`http://localhost:5000/api/users/${decoded.id}`)
          .then(res => {
            setCurrentUserName(res.data.fullName || "User");
          })
          .catch(err => {
            console.error("Error fetching user details:", err);
            setCurrentUserName("User");
          });
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }

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
    // Join room using the URL userId so both users join the exact same room
    newSocket.emit("joinRoom", { skillId, userId });
    
    newSocket.on("message", (newMessage) => { 
      setMessages((prev) => [...prev, newMessage]); 
    });
    
    return () => { newSocket.disconnect(); };
  }, [skillId, userId]);

  const sendMessage = async () => {
    if (!message.trim()) { setError("Message cannot be empty."); return; }
    
    // The backend saveMessage API uses senderId & receiverId
    const apiMessage = { skillId, senderId: currentUserId, receiverId: receiverId === currentUserId ? userId : receiverId, message };
    
    // The socket needs roomUserId to broadcast to the correct room
    const socketMessage = { 
      skillId, 
      roomUserId: userId, 
      senderId: currentUserId,
      senderName: currentUserName,
      message 
    };

    try {
      await axios.post("http://localhost:5000/api/chat/send", apiMessage);
      socket.emit("sendMessage", socketMessage);
      
      // We don't need to manually push to state because the socket event 
      // will broadcast it back to us if we are in the room!
      // But just in case of lag, we can optimistically add it and rely on a unique ID (omitted for simplicity, letting socket append it for everyone)
      
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
              {messages.map((msg, index) => {
                const isSentByMe = msg.senderId === currentUserId;
                return (
                  <div key={index} className={`message-wrapper ${isSentByMe ? 'sent-wrapper' : 'received-wrapper'}`}>
                    {!isSentByMe && (
                      <div className="message-avatar">
                        <User size={16} />
                      </div>
                    )}
                    <div className="message-content">
                      {!isSentByMe && <div className="message-sender-name">{msg.senderName || "User"}</div>}
                      <div className={`message ${isSentByMe ? "sent" : "received"}`}>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
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
      <Footer />
    </div>
  );
};

export default Chat;
