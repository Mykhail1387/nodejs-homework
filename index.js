'use strict';

const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

const { contactRouter } = require('./contacts/contact.router');

app.use(express.json());

app.use('/contacts', contactRouter);

app.listen(PORT, () => {
    console.log(`started listening on port ${PORT}`)
})