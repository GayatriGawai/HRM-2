const express = require('express');
const EmployeeUserDB = require('../../dbModels/UserDB');
const router = express.Router();
const Role = require('../../dbModels/rolesDB');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../../middleware/authMiddleware');

// @route   POST api/auth/register
// @desc    Register user
// @access  Private
router.post(
    '/register-user',
    authMiddleware,
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

// To get the user_list
// @ access Public
router.get('/getUsers', async (req, res) => {
    try {
        const users = await EmployeeUserDB.find();
        res.status(201).json(users);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
