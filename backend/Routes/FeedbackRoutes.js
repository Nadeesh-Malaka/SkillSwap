const express = require("express");
const router = express.Router();
const FeedbackController = require("../Controllers/FeedbackController");

// Create a feedback
router.post("/", FeedbackController.createFeedback);

// Get feedbacks for a specific skill
router.get("/:skillId", FeedbackController.getFeedbackBySkillId);

// Delete a feedback
router.delete("/:feedbackId", FeedbackController.deleteFeedback);

// Get all feedbacks
router.get("/", FeedbackController.getAllFeedback);


module.exports = router;
