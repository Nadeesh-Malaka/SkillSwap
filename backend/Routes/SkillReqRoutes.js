const express = require("express");
const router = express.Router();
const SkillReqController = require("../Controllers/SkillReqController");

// 1. Create a skill request
router.post("/", SkillReqController.createSkillRequest);

// 2. Get all requests for a specific skill
router.get("/skill/:skillId", SkillReqController.getRequestsBySkillId);

// 3. Update request acceptance status
router.patch("/", SkillReqController.updateRequestStatus);

// 4. Get accepted requests for a specific skill
router.get("/skill/accepted/:skillId", SkillReqController.getAcceptedRequestsBySkillId);


// Route to get all requests for a user
router.get("/:userId", SkillReqController.getUserRequestsbyid);

router.patch("/status", SkillReqController.updateRequestStatus);


router.put("/skill/:requestId", SkillReqController.updateRequestStatus);


router.patch("/approve", SkillReqController.approveRequestById);

module.exports = router;
