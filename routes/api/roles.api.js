const express = require('express');
const Role = require('../../dbModels/rolesDB');
const router = express.Router();
// GET API
// To get the roles
router.get('/getRoles', async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(201).json(roles);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
