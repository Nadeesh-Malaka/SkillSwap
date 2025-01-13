import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "./Chat.css";
import Nav from "../NavFooter/nav";
import Footer from "../NavFooter/footer";

const Chat = () => {
  const { skillId, userId } = useParams(); // Extract skillId and userId from URL
  const [messages, setMessages] = useState([]); // State for chat messages
  const [message, setMessage] = useState(""); // State for the new message
  const [receiverId, setReceiverId] = useState(""); // Skill owner's ID
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState("");

  // Fetch skill details and chat history
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        // Fetch skill details to get the receiverId (skill owner)
        const skillResponse = await axios.get(`http://localhost:5000/api/skills/${skillId}`);
        const skillOwnerId = skillResponse.data.userId; // Extract the owner ID
        setReceiverId(skillOwnerId);

        // Fetch existing chat messages
        const messagesResponse = await axios.get(
          `http://localhost:5000/api/chat/${skillId}/${userId}`
        );
        setMessages(messagesResponse.data.messages);
      } catch (err) {
        console.error("Error fetching chat details:", err);
        setError("Failed to load chat details.");
      }
    };

    fetchChatDetails();
  }, [skillId, userId]);

  // Initialize Socket.io connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Join the unique chat room
    newSocket.emit("joinRoom", { skillId, userId });

    // Listen for real-time messages
    newSocket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.disconnect(); // Clean up the connection on unmount
    };
  }, [skillId, userId]);

  const sendMessage = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    const newMessage = {
      skillId,
      senderId: userId,
      receiverId, // Now using the dynamically fetched receiverId
      message,
    };

    try {
      // Save the message to the server
      await axios.post("http://localhost:5000/api/chat/send", newMessage);

      // Emit the message to the room
      socket.emit("sendMessage", newMessage);

      // Update the UI with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear input field
      setMessage("");
      setError("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat Room</h2>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.senderId === userId ? "sent" : "received"
              }`}
            >
              <p>{msg.message}</p>
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
