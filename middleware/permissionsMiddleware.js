const Permission = require('../dbModels/permissionsDB');
const checkPermission = (allowedActions) => async (req, res, next) => {
    try {
        const user = req.user;

        // Ensure that user is authenticated and has a role
        if (!user || !user.role) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Fetch permissions for the user's role
        const permissions = await Permission.findOne({ roleID: user.role });

        if (!permissions || !permissions.permissions) {
            return res
                .status(403)
                .json({ error: 'User role or permissions not provided' });
        }

        // Check if the requested actions are allowed for any module
        const allowedModules = permissions.permissions.filter((permission) => {
            return allowedActions.some((action) =>
                permission.actions.includes(action)
            );
        });

        if (allowedModules.length === 0) {
            return res.status(403).json({ error: 'Permission denied' });
        }

        next();
    } catch (error) {
        console.error('Error checking permissions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = checkPermission;
