// models/SkillReqModel.js

const mongoose = require("mongoose");

const skillReqSchema = new mongoose.Schema({
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isAccepted: { type: Boolean, default: false },
  chatURL: { type: String }, // Store the chat URL
}, { timestamps: true });


module.exports = mongoose.model("SkillRequest", skillReqSchema);
