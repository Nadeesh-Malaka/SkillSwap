const SkillRequest = require("../Models/SkillReqModel");
const Skill = require("../Models/SkillModel");
const User = require("../Models/UserModel");

// 1. Create a new skill request
exports.createSkillRequest = async (req, res) => {
  const { skillId, userId, chatURL } = req.body;

  try {
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const existingRequest = await SkillRequest.findOne({ skillId, userId });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent for this skill." });
    }

    const newRequest = new SkillRequest({ skillId, userId, chatURL });
    await newRequest.save();

    res.status(201).json({ message: "Request created successfully!", request: newRequest });
  } catch (error) {
    console.error("Error creating skill request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2. Get all skill requests for a specific skill
exports.getRequestsBySkillId = async (req, res) => {
    const { skillId } = req.params;
  
    try {
      const requests = await SkillRequest.find({ skillId })
        .populate("skillId")
        .populate("userId");
      res.status(200).json({ requests });
    } catch (error) {
      console.error("Error fetching requests by skill ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// 3. Update request acceptance
exports.updateRequestStatus = async (req, res) => {
  const { requestId, isAccepted } = req.body;

  try {
    const request = await SkillRequest.findByIdAndUpdate(
      requestId,
      { isAccepted },
      { new: true }
    ).populate("skillId").populate("userId");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request status updated", request });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 4. Get accepted requests for a specific skill
exports.getAcceptedRequestsBySkillId = async (req, res) => {
    const { skillId } = req.params;
  
    try {
      const requests = await SkillRequest.find({
        skillId,
        isAccepted: true,
      })
        .populate("skillId")
        .populate("userId");
  
      res.status(200).json({ requests });
    } catch (error) {
      console.error("Error fetching accepted requests by skill ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  //5.Get all skill requests for a user using userid
exports.getUserRequestsbyid = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await SkillRequest.find({ userId }).populate("skillId").populate("userId");
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.updateRequestStatus = async (req, res) => {
  const { requestId, isAccepted } = req.body;

  try {
    const updatedRequest = await SkillRequest.findByIdAndUpdate(
      requestId,
      { isAccepted },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.approveRequestById = async (req, res) => {
  const { requestId } = req.body;

  try {
    // Validate if requestId is provided
    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    // Update the isAccepted field
    const updatedRequest = await SkillRequest.findByIdAndUpdate(
      requestId,
      { isAccepted: true },
      { new: true } // Return the updated document
    ).populate("skillId").populate("userId");

    if (!updatedRequest) {
      return res.status(404).json({ message: "Skill request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Request approved successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





