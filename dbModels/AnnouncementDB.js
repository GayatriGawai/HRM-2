const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeeUser',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
