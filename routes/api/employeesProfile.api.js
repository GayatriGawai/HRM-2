const express = require('express');
const router = express.Router();
const Profile = require('../../dbModels/ProfileDB');
const authMiddleware = require('../../middleware/authMiddleware');
const checkPermission = require('../../middleware/permissionsMiddleware');
const Role = require('../../dbModels/rolesDB');

// @route   POST /api/profiles
// @desc    Create a new profile
// @access  Private
router.post(
    '/addProfile',
    authMiddleware,
    checkPermission(['create']),
    async (req, res) => {
        try {
            const profileData = req.body;

            const newProfile = new Profile(profileData);
            await newProfile.save();

            res.status(201).json(newProfile);
        } catch (error) {
            console.error('Error creating profile:', error);
            res.status(500).json({ error: 'Server error' });
            console.log(error);
        }
    }
);

// @route   GET /api/profiles
// @desc    Get all profiles
// @access  Private

router.get(
    '/getList',
    authMiddleware,
    checkPermission(['read']),
    async (req, res) => {
        try {
            const profiles = await Profile.find();
            res.json(profiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// @route   GET /api/profiles/:id
// @desc    Get a profile by ID
// @access  Private
router.get(
    '/getProfile/:id',
    authMiddleware,
    checkPermission(['read']),
    async (req, res) => {
        try {
            const profileId = req.params.id;
            const profile = await Profile.findById(profileId).populate('role');

            if (!profile) {
                return res.status(404).json({ error: 'Profile not found' });
            }

            res.json(profile);
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// @route   PUT /api/profiles/:id
// @desc    Update a profile by ID
// @access  Private
router.put(
    '/updateProfile/:id',
    checkPermission(['update']),
    async (req, res) => {
        try {
            const profileId = req.params.id;
            const updatedProfileData = req.body;

            if (
                updatedProfileData.role &&
                typeof updatedProfileData.role === 'object'
            ) {
                updatedProfileData.role =
                    updatedProfileData.role._id || updatedProfileData.role;
            }

            const updatedProfile = await Profile.findByIdAndUpdate(
                profileId,
                updatedProfileData,
                { new: true }
            ).populate('role');

            if (!updatedProfile) {
                return res.status(404).json({ error: 'Profile not found' });
            }

            res.json(updatedProfile);
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// @route   DELETE /api/profiles/:id
// @desc    Delete a profile by ID
// @access  Private
router.delete(
    '/profiles/:id',
    checkPermission(['delete']),
    async (req, res) => {
        try {
            const profileId = req.params.id;

            const deletedProfile = await Profile.findByIdAndDelete(profileId);

            if (!deletedProfile) {
                return res.status(404).json({ error: 'Profile not found' });
            }

            res.json({ message: 'Profile deleted successfully' });
        } catch (error) {
            console.error('Error deleting profile:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

module.exports = router;
