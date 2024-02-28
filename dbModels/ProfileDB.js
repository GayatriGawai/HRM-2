const mongoose = require('mongoose');

const EmployeeProfileSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        required: true,
    },

    emailAddress: {
        type: String,
        required: true,
    },

    skills: {
        type: [String],
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },

    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldofstudy: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],

    experience: [
        {
            title: {
                type: String,
            },
            company: {
                type: String,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],

    position: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Trainee', 'Regular-Employee', 'Terminated', 'Absconded'],
        default: 'Trainee',
        required: true,
    },

    salary: {
        type: Number,
        required: true,
    },

    dob: {
        type: Date,
        required: true,
    },
    attendance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttendanceRecord',
    },
});

const Profile = mongoose.model('Profile', EmployeeProfileSchema);

module.exports = Profile;
