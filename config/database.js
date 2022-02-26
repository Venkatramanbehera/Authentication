const mongoose = require('mongoose');
require('dotenv').config();

const configureDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('connected to MongoDB');
        }).catch((err) => {
            console.log(err.message);
        })
};

module.exports = configureDB;