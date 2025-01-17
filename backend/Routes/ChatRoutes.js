const express = require("express");
const ChatController = require("../Controllers/ChatController");

const router = express.Router();

// Route to save a message
router.post("/send", ChatController.saveMessage);

// Route to get all messages for a specific skill and user
router.get("/:skillId/:userId", ChatController.getMessages);


router.get("/all", ChatController.getAllChats); // Fetch all chats
router.delete("/:id", ChatController.deleteChat); // Delete chat by ID
router.get("/skill/:id", ChatController.getSkillDetails); // Get skill details

module.exports = router;
