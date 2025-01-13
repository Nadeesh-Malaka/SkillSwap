const Skill = require('../Models/SkillModel');
const upload = require('../Utils/fileUpload'); 

exports.createSkill = async (req, res) => {
    const { userId, title, description, category, isApproved, isRequest } = req.body;
  
    try {
      const skillPicPath = req.file
        ? `images/${req.file.filename}`
        : 'images/default_skill.png'; // Default image if none is uploaded
  
      const newSkill = new Skill({
        userId,
        title,
        description,
        category,
        skill_pic: skillPicPath,
        isApproved,
        isRequest,
      });
  
      const savedSkill = await newSkill.save();
      res.status(201).json({ success: true, data: savedSkill });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a Skill
  exports.updateSkill = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, isApproved, isRequest } = req.body;
  
    try {
      const skillPicPath = req.file
        ? `images/${req.file.filename}`
        : undefined; // If no file, retain the existing image
  
      const updateData = {
        title,
        description,
        category,
        isApproved,
        isRequest,
      };
  
      if (skillPicPath) {
        updateData.skill_pic = skillPicPath;
      }
  
      const updatedSkill = await Skill.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedSkill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
  
      res.status(200).json({ success: true, data: updatedSkill });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Other CRUD methods remain unchanged...

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Search skills by title or category
exports.searchSkills = async (req, res) => {
  try {
    const { query } = req.params; // e.g., req.params.query
    const skills = await Skill.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
