require = require('esm')(module);

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import contactRouter from './contacts/contact.router';
const PORT = process.env.PORT || 3001;


const runServer = async () => {
    const app = express();
    try {
        await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true });
        console.log('Database connection successful');
        app.use(express.json());

        app.use('/contacts', contactRouter);

        app.listen(PORT, () => {
            console.log(`started listening on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }

}


runServer();