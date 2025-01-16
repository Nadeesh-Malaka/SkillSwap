const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http"); // For creating the server
const socketIo = require("socket.io"); // For real-time communication

// Routes
const userRoutes = require("./Routes/userRoutes");
const skillRouter = require("./Routes/SkillRouter");
const skillReqRoutes = require("./Routes/SkillReqRoutes");
const chatRoutes = require("./Routes/ChatRoutes"); 
const contactRoutes = require("./Routes/ContactRoutes");
const feedbackRoutes = require("./Routes/FeedbackRoutes"); 


const app = express();
const server = http.createServer(app); // Create server instance for Socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend's URL if necessary
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files (images)
app.use("/images", express.static("public/images"));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Skillswap";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes); 
app.use("/api/skills", skillRouter);
app.use("/api/requests", skillReqRoutes);
app.use("/api/chat", chatRoutes); 
app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);


// Test route

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Socket.io for real-time chat
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a specific chat room
  socket.on("joinRoom", ({ skillId, userId }) => {
    const room = `${skillId}_${userId}`; // Unique room for skill and user
    socket.join(room);
    console.log(`User ${userId} joined room: ${room}`);
  });

  // Listen for messages and broadcast to the room
  socket.on("sendMessage", ({ skillId, userId, text }) => {
    const room = `${skillId}_${userId}`;
    const message = { userId, text, createdAt: new Date() };
    io.to(room).emit("message", message); // Broadcast message to the room
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Server Settings
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
