const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../Controllers/UserController');

const router = express.Router();

// Register a user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get all users
router.get('/', getAllUsers);

module.exports = router;
