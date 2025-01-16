const express = require("express");
const router = express.Router();
const ContactController = require("../Controllers/ContactController");

// Route to save a contact message
router.post("/", ContactController.saveMessage);

// Route to get all contact messages
router.get("/", ContactController.getMessages);

// Route to delete a contact message by ID
router.delete("/:id", ContactController.deleteMessage);

module.exports = router;
