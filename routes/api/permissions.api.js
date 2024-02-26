const express = require('express');
const router = express.Router();
const Permission = require('../../dbModels/permissionsDB');
const Role = require('../../dbModels/rolesDB');
const User = require('../../dbModels/UserDB');
const Module = require('../../dbModels/modulesDB');
const authMiddleware = require('../../middleware/authMiddleware');

// POST route to handle form submission and save data to the database
router.post('/role', async (req, res) => {
    try {
        const { name, permissions } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res
                .status(400)
                .json({ message: 'Role with the same name already exists' });
        }

        const role = await Role.create({ name });

        const permission = new Permission({
            roleID: role._id,
            permissions,
        });

        // Save the permission
        await permission.save();

        res.status(201).json({
            message: 'Role and Permissions created successfully',
        });
    } catch (error) {
        console.error('Error creating role and permissions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET allowed modules for the logged-in user
router.get('/allowed-modules', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const permissions = await Permission.findOne({ roleID: user.role });
        if (!permissions) {
            return res.status(404).json({ message: 'Permissions not found' });
        }

        // Extract module IDs from permissions object keys
        const moduleIds = Object.values(permissions.permissions).map(
            (permission) => permission.module_id
        );

        // Fetch module documents corresponding to the module IDs
        const allowedModules = await Module.find({ _id: { $in: moduleIds } });

        // Extract module names from fetched modules
        const allowedModuleNames = allowedModules.map((module) => module.name);

        res.json({ allowedModules: allowedModuleNames });
    } catch (error) {
        console.error('Error fetching allowed modules:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
