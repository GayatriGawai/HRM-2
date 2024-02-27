//It is a login schema only for Login

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    email: {
        //Its an official email address
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
