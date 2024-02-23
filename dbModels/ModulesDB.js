const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
