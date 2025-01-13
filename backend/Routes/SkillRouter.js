const express = require('express');
const router = express.Router();
const skillController = require('../Controllers/SkillController');
const upload = require('../Utils/fileUpload');


// Create a skill (with file upload)
router.post('/', upload.single('skill_pic'), skillController.createSkill);

// Update a skill (with optional file upload)
router.put('/:id', upload.single('skill_pic'), skillController.updateSkill);



// Define skill-related routes
router.post('/', skillController.createSkill);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);
router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.get('/search/:query', skillController.searchSkills);

module.exports = router;
