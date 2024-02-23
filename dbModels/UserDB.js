const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // References the Role model
    },
});

const EmployeeUserDB = mongoose.model('user', UserSchema);

module.exports = EmployeeUserDB;
