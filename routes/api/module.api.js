const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Module = require('../../dbModels/modulesDB');

// POST API
// To create a Post/Announcement
// Private Route {only admins can create a post}

router.post('/create', async (req, res) => {
    try {
        const { name } = req.body;

        const newModule = await Module({
            name,
        });

        const module = await newModule.save();
        res.status(201).json(module);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const module = await Module.find();
        res.status(201).json(module);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).send();
        }
        res.send(module);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
