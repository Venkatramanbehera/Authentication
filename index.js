const express = require('express')
const configureDB = require('./config/database');
require('dotenv').config();
// for getting data of .env file
const app = express();

const PORT = process.env.PORT;

configureDB();

app.listen(PORT, () => {
    console.log('App is running on PORT - ', PORT);
})