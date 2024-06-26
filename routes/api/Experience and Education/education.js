const express = require('express');
const authMiddleware = require('../../../middleware/authMiddleware');
const checkPermission = require('../../../middleware/permissionsMiddleware');
const { check, validationResult } = require('express-validator');
const Profile = require('../../../dbModels/ProfileDB');
const router = express.Router();

// To create the education where education is not added already
router.post(
    '/createEdu/:id',
    authMiddleware,

    [
        check('university', 'University is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const {
            university,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        } = req.body;

        const newEdu = {
            university,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        };

        try {
            // Create a new profile with the education entry
            const profile = new Profile({
                education: [newEdu],
                // Add other profile fields here if needed
            });

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// To update the education where education is added already

router.put(
    '/addEdu/:id',
    authMiddleware,

    [
        check('university', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const {
            university,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        } = req.body;
        const newEdu = {
            university,
            degree,
            fieldofstudy,
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
            // this line is used to add new education
            // entry to the starting index of the education array  within profile
            profile.education.unshift(newEdu);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
