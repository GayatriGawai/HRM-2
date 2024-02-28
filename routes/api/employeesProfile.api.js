const express = require('express');
const router = express.Router();
const Employee = require('../../dbModels/ProfileDB');
const EmployeeUserDB = require('../../dbModels/UserDB');
const authMiddleware = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
// const { v4: uuidv4 } = require('uuid');

// @route   POST api/employees
// @desc    Create a new employee
// @access  Private
// Inside your server-side route handler

router.post('/profiles', async (req, res) => {
    try {
        const profileData = req.body;

        const newProfile = new Employee(profileData);
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//===================================================================================

module.exports = router;
