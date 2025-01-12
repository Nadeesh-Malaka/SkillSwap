const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true   
  },
  role: {
    type: String,
    default: 'user' // Default role is user
    
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: { type: String, trim: true },
  contact_Num: { type: String, trim: true },
  uni_Name: { type: String, trim: true },
  profile_pic: { type: String,
     default: 'images/profile.png'  },
  bio: {
     type: String,
     default: "I Am A SkillSwap User. I Love To Learn And Teach New Skills.",
      trim: true },
  sk_Learn: [{ type: String, trim: true }], // Skills user wants to learn
  sk_Teach: [{ type: String, trim: true }]  // Skills user can teach
});

const User = mongoose.model('User', userSchema);

module.exports = User;
