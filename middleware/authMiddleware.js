const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get the JWT token from the request header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        return res
            .status(401)
            .json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Populate req.roles with decoded roles
        req.roles = decoded.roles;

        // Call next middleware
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
