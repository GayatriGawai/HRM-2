const express = require('express');
const router = express.Router();
const Roles = require('../../dbModels/RolesDB');

// POST API
// To create a Role
// Private Route {only admins can create a post}

router.post('/create', async (req, res) => {
    try {
        const { name } = req.body;

        const newRole = await Roles({
            name,
        });
        const role = await newRole.save();
        res.status(201).json(role);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/get', async (req, res) => {
    try {
        const role = await Roles.find();
        res.status(201).json(role);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const role = await Roles.findById(req.params.id);
        if (!role) {
            return res.status(404).send();
        }
        res.send(role);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
