const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Announcement = require('../../dbModels/AnnouncementDB');

// POST API
// To create a Post/Announcement
// Private Route {only admins can create a post}

router.post(
    '/createNews',
    [
        authMiddleware,
        [
            check('title', 'Title is required'),
            check('content', 'Content is required'),
        ],
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, content } = req.body;

            const newAnnouncement = await Announcement({
                title,
                content,
                user: req.roles.id,
            });

            const announcement = await newAnnouncement.save();
            res.status(201).json(announcement);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// GET API
// Getting all announcements
// Public route {all employees can see the posts}

router.get('/getNews', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const config = { pageSize: 10 };
    try {
        const totalPost = await Announcement.countDocuments();
        const totalPage = Math.ceil(totalPost / config.pageSize);

        if (page < 1 || page > totalPage) {
            return res.status(400).json({ msg: 'Invalid page number' });
        }

        const skip = (page - 1) * config.pageSize;

        const announcements = await Announcement.find()
            .skip(skip)
            .limit(config.pageSize);
        if (!announcements || announcements.length === 0) {
            return res.status(404).json({ msg: 'No announcements found' });
        }
        res.json(announcements);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// GET API
// Getting an announcement by ID
// Public route {all employees can see the post}

router.get('/announcements/:id', async (req, res) => {
    try {
        const announcement = await Announcement.findOne({ _id: req.params.id });

        if (!announcement) {
            return res.status(404).json({ msg: 'announcement not found' });
        }

        res.json(announcement);
    } catch (error) {
        console.error(error.message);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'announcement not found' });
        }
        res.status(500).send('Server error');
    }
});

// PUT API
// Updating an announcement by ID
// Private route {Only Admins}

router.put(
    '/updateNews/:id',
    [
        authMiddleware,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('content', 'Content is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        try {
            if (req.roles !== 'admin') {
                return res.status(403).json({
                    message: 'Access denied, admin privileges required',
                });
            }

            const announcementId = req.params.id;
            const updateFields = req.body;

            const updatedAnnouncement = await Announcement.findByIdAndUpdate(
                announcementId,
                { $set: updateFields },
                { new: true }
            );

            if (!updatedAnnouncement) {
                return res
                    .status(404)
                    .json({ message: 'Announcement not found' });
            }

            res.json(updatedAnnouncement);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// DELTE API
// Deleting an announcement by ID
// Private route {Only Admins}

router.delete('/deleteNews/:id', authMiddleware, async (req, res) => {
    try {
        if (req.roles !== 'admin') {
            return res.status(403).json({
                message: 'Access denied, admin privileges required',
            });
        }

        const announcement = await Announcement.findByIdAndDelete(
            req.params.id
        );

        if (!announcement) {
            return res.status(404).json({ msg: 'Announcement not found' });
        }
        res.json({ msg: 'Announcement deleted' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Announcement not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;
