const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    hoursWorked: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

module.exports = Timesheet;
