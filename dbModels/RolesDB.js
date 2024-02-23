const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true, // Will create unique role names, so there won't be duplicates
    },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
