const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum: ['admin', 'employee'],
        required: true,
    },
});

const EmployeeUserDB = mongoose.model('employeeUser', EmployeeUserSchema);

module.exports = EmployeeUserDB;
