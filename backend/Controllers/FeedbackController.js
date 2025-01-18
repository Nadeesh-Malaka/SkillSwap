const Feedback = require("../Models/FeedbackModel");

// Create a feedback
exports.createFeedback = async (req, res) => {
  const { skillId, userId, rating, comment } = req.body;

  try {
    if (!skillId || !userId || !rating) {
      return res.status(400).json({ message: "Skill ID, User ID, and rating are required." });
    }

    const feedback = new Feedback({ skillId, userId, rating, comment });
    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback created successfully!",
      data: savedFeedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get feedbacks for a specific skill
exports.getFeedbackBySkillId = async (req, res) => {
  const { skillId } = req.params;

  try {
    const feedbacks = await Feedback.find({ skillId }).populate("userId", "fullName");
    res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks by skill ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a feedback
exports.deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all feedbacks
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("skillId userId", "name fullName"); // Populating skillId and userId fields
    res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error fetching all feedbacks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
