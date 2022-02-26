const express = require('express')
require('dotenv').config();
// for getting data of .env file
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('App is running on PORT - ', PORT);
})