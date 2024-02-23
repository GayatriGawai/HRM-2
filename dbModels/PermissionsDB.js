const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    permissions: {
        type: Object,
        required: true,
    },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
