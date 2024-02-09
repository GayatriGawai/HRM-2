const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
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

const Roles = mongoose.model('Roles', RolesSchema);

module.exports = Roles;
