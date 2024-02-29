const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const EmployeeUserDB = require('../../dbModels/UserDB');
const Role = require('../../dbModels/rolesDB');
const authMiddleware = require('../../middleware/authMiddleware');

// @route   POST /api/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
    '/login',
    [
        // Validate email, password, and role
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        check('role', 'Role is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, role } = req.body;

        try {
            // Check if user exists
            let user = await EmployeeUserDB.findOne({ email }).populate('role');

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check if the provided password matches the user's password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check if the user has the provided role
            if (!user.role || user.role.name !== role) {
                return res
                    .status(400)
                    .json({ message: 'Invalid role selected' });
            }

            // Generate JWT token with user ID and role
            const payload = {
                user: {
                    id: user.id,
                    role: role,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 }, // Adjust expiration time as needed
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        check('role', 'Role is required').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, role } = req.body;

        try {
            let user = await EmployeeUserDB.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const existingRole = await Role.findOne({ name: role });
            if (!existingRole) {
                return res
                    .status(400)
                    .json({ message: 'Invalid role selected' });
            }

            user = new EmployeeUserDB({
                email,
                password,
                role: existingRole._id, // Associate the role ID with the user
            });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).send('Server error');
        }
    }
);

//==================================================================================

// You will have to provide the auth token in the headers of the postman to test it
//@route     GET api/auth
//@desc      Test route
//@access    Public
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await EmployeeUserDB.findById(req.user.id).select(
            '-password'
        );
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//==================================================================================

module.exports = router;
