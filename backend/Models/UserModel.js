const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true   
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: { type: String, trim: true },
  contact_Num: { type: String, trim: true },
  uni_Name: { type: String, trim: true },
  profile_pic: { type: String, default: null },
  bio: { type: String, trim: true },
  sk_Learn: [{ type: String, trim: true }], // Skills user wants to learn
  sk_Teach: [{ type: String, trim: true }]  // Skills user can teach
});

const User = mongoose.model('User', userSchema);

module.exports = User;
