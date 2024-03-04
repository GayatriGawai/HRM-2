const jwt = require('jsonwebtoken');
const config = require('config');
const EmployeeUserDB = require('../dbModels/UserDB'); // Assuming you have a User model

module.exports = async function (req, res, next) {
    // Get the JWT token from the request headers
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Extract the user ID from the decoded token
        const userId = decoded.user.id;

        // Fetch the user data from the database, populating the 'role' field
        const user = await EmployeeUserDB.findById(userId).populate('role');

        if (!user) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        // Attach the user object to the request object
        req.user = user;

        // Call the next middleware
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
