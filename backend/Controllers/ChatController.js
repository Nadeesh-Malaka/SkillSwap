const Chat = require("../Models/ChatModel");
const Skill = require("../Models/SkillModel"); // Import the Skill model
const mongoose = require("mongoose");

// Save a new message
exports.saveMessage = async (req, res) => {
  try {
    const { skillId, senderId, message } = req.body;

    // Validate required fields
    if (!skillId || !senderId || !message) {
      console.error("Missing fields:", { skillId, senderId, message });
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate skillId
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      return res.status(400).json({ error: "Invalid skillId" });
    }

    // Fetch the skill to get the receiverId (skill owner's userId)
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    const receiverId = skill.userId; // Skill owner's ID

    // Create a new chat message
    const chatMessage = new Chat({
      skillId,
      senderId,
      receiverId,
      message,
    });

    // Save the message to the database
    const savedMessage = await chatMessage.save();
    res.status(201).json({ success: true, message: "Message sent successfully", data: savedMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

  

// Fetch chat messages for a specific skill and user pair
exports.getMessages = async (req, res) => {
  const { skillId, userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(skillId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid skillId or userId" });
    }

    const messages = await Chat.find({
      skillId,
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
