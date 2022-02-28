const express = require('express')
const configureDB = require('./config/database');
const router = require('./config/routes');
require('dotenv').config();
// for getting data of .env file
const app = express();

const PORT = process.env.PORT;

configureDB();
app.use(express.json());
app.use(router)

app.listen(PORT, () => {
    console.log('App is running on PORT - ', PORT);
})