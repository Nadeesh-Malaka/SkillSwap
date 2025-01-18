const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true, 
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  skill_pic: {
    type: String,
    default: 'images/default-skill.png'
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isRequest: {
    type: Boolean,
    default: false
  }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
