const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware');
const Roles = require('../../dbModels/Roles');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
    // console.log(7, req);
    try {
        const role = await Roles.findById(req.roles.id).select('-password');
        res.json(role);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

///USER AUTHENTICATION AND GETTING THE TOKEN

router.post(
    '/',
    [
        check('email', 'Please enter email address').isEmail(),
        check('password', 'Enter the valid password').exists(),
        check('roles', 'Please select the role').notEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, roles } = req.body;
        try {
            let role = await Roles.findOne({ email });

            if (!role) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const ismatch = await bcrypt.compare(password, role.password);

            if (!ismatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Passwords do not match' }] });
            }

            const payload = {
                roles: {
                    id: role.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 36000,
                },
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
