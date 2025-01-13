// Controllers/SkillReqController.js

const SkillRequest = require("../Models/SkillReqModel");
const Skill = require("../Models/SkillModel");
const User = require("../Models/UserModel");

// Create a new skill request
exports.createSkillRequest = async (req, res) => {
  const { skillId, userId } = req.body;

  try {
    // Check if the skill exists
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Check if a request already exists
    const existingRequest = await SkillRequest.findOne({ skillId, userId });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent for this skill." });
    }

    // Create a new skill request
    const newRequest = new SkillRequest({ skillId, userId });
    await newRequest.save();

    res.status(201).json({ message: "Request created successfully!", request: newRequest });
  } catch (error) {
    console.error("Error creating skill request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all skill requests for a user
exports.getUserRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await SkillRequest.find({ userId }).populate("skillId").populate("userId");
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update request acceptance
exports.updateRequestStatus = async (req, res) => {
  const { requestId, isAccepted } = req.body;

  try {
    const request = await SkillRequest.findByIdAndUpdate(
      requestId,
      { isAccepted },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request status updated", request });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get accepted requests for a user
exports.getAcceptedRequests = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const requests = await SkillRequest.find({
        $or: [{ userId }, { "skillId.userId": userId }],
        isAccepted: true,
      }).populate("skillId").populate("userId");
  
      res.status(200).json({ requests });
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  