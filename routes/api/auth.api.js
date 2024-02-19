const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const EmployeeUserDB = require('../../dbModels/UserDB');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
        check('roles', 'Select the role').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, roles } = req.body;

        try {
            let user = await EmployeeUserDB.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Ensure that the roles provided match the roles stored in the database

            if (!user.roles.includes(roles)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid role selected' });
            }

            // console.log('user.roles:', user.roles);
            // console.log('req.roles:', req.roles);
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                },
                roles: user.roles, // Include roles in the JWT payload
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 }, // You can adjust the expiration time as needed
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
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
        check('roles', 'Select the role').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, roles } = req.body;

        try {
            let user = await EmployeeUserDB.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            user = new EmployeeUserDB({
                email,
                password,
                roles,
            });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
                roles: user.roles, // Include roles in the JWT payload
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 }, // You can adjust the expiration time as needed
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

module.exports = router;
