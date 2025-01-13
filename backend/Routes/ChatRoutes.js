const express = require("express");
const ChatController = require("../Controllers/ChatController");

const router = express.Router();

// Route to save a message
router.post("/send", ChatController.saveMessage);

// Route to get all messages for a specific skill and user
router.get("/:skillId/:userId", ChatController.getMessages);

module.exports = router;
