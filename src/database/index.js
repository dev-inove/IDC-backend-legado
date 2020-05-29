const mongoose = require('mongoose')

class Database {
    constructor() {
        this.init()
    }

    init() {
        try {
            this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            })

            console.log('Database connected!')
        } catch (e) {
            console.log("Database didn't connect!")
        }
    }
}

module.exports = new Database()
