const express = require('express');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');

const app = express();

// routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on http://localhost:' + process.env.PORT);
});