const express = require('express');
const cors = require('cors');
require('dotenv').config();
const contactRouter = require('./contacts/contact.router');
module.exports = class contactsSErver {
    constructor() {
        this.server = null;
    }

    start = () => {
        this.initServer();
        this.initmiddleware();
        this.initRoutes();
        this.startListening()
    }

    initServer = () => {
        this.server = express();
    }
    initmiddleware = () => {
        this.server.use(express.json());
        this.server.use(cors({
            origin: 'http://localhost:3000'
        }))
    }
    initRoutes = () => {
        this.server.use('/contacts', contactRouter)
    }
    startListening = () => {
        this.server.listen(process.env.PORT, () => {
            console.log(`Server started listening on ${process.env.PORT} port`)
        })
    }
}