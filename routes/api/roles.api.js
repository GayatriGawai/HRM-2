const express = require('express');
const { check, validationResult } = require('express-validator');
const Roles = require('../../dbModels/Roles');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

router.post(
    '/',
    [
        check('email', 'Please enter the official email address').isEmail(),
        check('password', 'Enter the valid password').isLength({ min: 8 }),
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

            if (role) {
                res.status(400).json({
                    errors: [{ msg: 'User already exists' }],
                });
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            role = new Roles({
                email,
                password,
                roles,
                avatar,
            });

            const salt = await bcrypt.genSalt(10);

            role.password = await bcrypt.hash(password, salt);

            await role.save();

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
