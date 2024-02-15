const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
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
        unique: true,
        lowercase: true,
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
        enum: ['Trainee', 'Regular Employee', 'Terminated', 'Absconded'],
        default: 'Trainee',
        required: true,
    },

    salary: {
        type: Number,
        required: true,
    },

    isAdmin: {
        type: Boolean,
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

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
