const express = require('express');
require('dotenv').config({ path: './config/.env' });
require('./config/db');

const app = express();


app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on http://localhost:' + process.env.PORT);
});