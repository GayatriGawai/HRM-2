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

// Updating the role permissions by the IsD

router.put('/role/:id/permissions', async (req, res) => {
    try {
        const roleId = req.params.id;
        const { permissions } = req.body;

        // Check if the role exists
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Update permissions for the role
        const existingPermission = await Permission.findOne({ roleID: roleId });
        if (existingPermission) {
            existingPermission.permissions = permissions;
            await existingPermission.save();
        } else {
            const permission = new Permission({
                roleID: roleId,
                permissions,
            });
            await permission.save();
        }

        res.status(200).json({ message: 'Permissions updated successfully' });
    } catch (error) {
        console.error('Error updating permissions for role:', error);
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

// GET allowed modules actions for the logged-in user
router.get('/allowed-actions', authMiddleware, async (req, res) => {
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

        // Extract allowed actions for each module
        const allowedModuleActions = {};
        for (const moduleId in permissions.permissions) {
            const actions = permissions.permissions[moduleId].actions;
            allowedModuleActions[moduleId] = actions;
        }

        res.json({ allowedModuleActions });
    } catch (error) {
        console.error('Error fetching allowed modules actions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
