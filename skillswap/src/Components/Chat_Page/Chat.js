import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import './Chat.css';  // Importing the CSS file for styling
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

const Chat = () => {
  const { skillId, userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = io("http://localhost:5000");

  useEffect(() => {
    // Join a specific chat room
    socket.emit("joinRoom", { skillId, userId });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [skillId, userId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { skillId, userId, text: message });
      setMessage("");
    }
  };

  return (
    <div>
        <Nav/>
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.userId === userId ? "sent" : "received"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Chat;
