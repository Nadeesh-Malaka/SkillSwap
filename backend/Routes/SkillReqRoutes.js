// routes/SkillReqRoutes.js

const express = require("express");
const router = express.Router();
const SkillReqController = require("../Controllers/SkillReqController");

// Route to create a skill request
router.post("/", SkillReqController.createSkillRequest);

// Route to get all requests for a user
router.get("/:userId", SkillReqController.getUserRequests);

// Route to update request acceptance status
router.patch("/", SkillReqController.updateRequestStatus);

module.exports = router;
