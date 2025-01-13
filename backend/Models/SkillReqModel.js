// models/SkillReqModel.js

const mongoose = require("mongoose");

const skillReqSchema = new mongoose.Schema({
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isAccepted: { type: Boolean, default: false }, // Whether the request is accepted by the skill owner
}, { timestamps: true });

module.exports = mongoose.model("SkillRequest", skillReqSchema);
