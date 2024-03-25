const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const checkPermission = require('../../../middleware/permissionsMiddleware');
const { check, validationResult } = require('express-validator');
const Profile = require('../../../dbModels/ProfileDB');
const router = express.Router();

router.put(
    '/addExp/:id',
    authMiddleware,

    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const { title, compnay, location, from, to, current, description } =
            req.body;
        const newEdu = {
            title,
            compnay,
            location,
            from,
            to,
            current,
            description,
        };
        try {
            const profile = await Profile.findById(req.params.id).populate(
                'role'
            );
            if (!profile) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            // this line is used to add new experience
            // entry to the starting index of the experience array  within profile
            profile.experience.unshift(newEdu);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
