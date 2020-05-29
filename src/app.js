<<<<<<< HEAD
require('dotenv').config();
require('./database');
// eslint-disable-next-line no-underscore-dangle
require('events').EventEmitter.prototype._maxListeners = 100;
const express = require('express');
=======
require('dotenv').config()
require('./database')
const express = require('express')
>>>>>>> upstream/alvaro

const routes = require('./routes')

class App {
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    routes() {
        this.server.use(routes)
    }

    middlewares() {
        this.server.use(express.json())
    }
}

module.exports = new App().server
