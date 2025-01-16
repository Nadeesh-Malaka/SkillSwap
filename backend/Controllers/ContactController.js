const Contact = require("../Models/ContactModel");

// Save a new contact message
exports.saveMessage = async (req, res) => {
  try {
    const { userId, email, name, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const newContact = new Contact({ userId, email, name, message });
    const savedContact = await newContact.save();

    res.status(201).json({ success: true, message: "Feedback submitted successfully!", data: savedContact });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all contact messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a contact message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found." });
    }

    res.status(200).json({ success: true, message: "Message deleted successfully." });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
