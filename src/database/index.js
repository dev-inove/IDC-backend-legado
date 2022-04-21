const mongoose = require('mongoose');

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
      });
      console.log('Database connected!');
    } catch (e) {
      console.log("Database didn't connect!");
    }
  }
}

module.exports = new Database();
