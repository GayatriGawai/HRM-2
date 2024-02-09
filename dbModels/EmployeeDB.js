const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
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

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },

    position: {
        type: String,
        required: true,
        enum: ['Intern', 'Regular Employee', 'Manager'],
    },

    salary: {
        type: Number,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        required: [true, 'isAdmin is required'],
    },
    dob: {
        type: Date,
        required: [true, 'dob is required'],
    },
    attendance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttendanceRecord',
    },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
