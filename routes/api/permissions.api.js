const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');

// POST route to handle form submission and save data to the database
router.post('/', async (req, res) => {
    try {
        const { name, modules } = req.body;

        const permission = new Permission({
            roleID: null,
            permissions: { name, modules },
        });

        // Save the permission to the database
        await permission.save();

        res.status(201).json({ message: 'Permission created successfully' });
    } catch (error) {
        console.error('Error creating permission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
