const express = require('express');
const router = express.Router();
const Permission = require('../../dbModels/permissionsDB');
const Role = require('../../dbModels/rolesDB');

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

        // Create a new role
        // const role = new Role({ name });

        // await role.save();

        const role = await Role.create({ name });

        // Iterate over permissions and save each one
        for (const perm of permissions) {
            const { modelID, actions } = perm;

            // Create a new permission document
            const permission = new Permission({
                roleID: role._id,
                permissions: { modelID, actions },
            });

            // Save the permission
            await permission.save();
        }

        res.status(201).json({
            message: 'Role and Permissions created successfully',
        });
    } catch (error) {
        console.error('Error creating role and permissions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
