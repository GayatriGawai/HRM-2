const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
console.log(4, db);
const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('+++++ MongoDB Connected +++++');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
