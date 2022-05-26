const AssistedUser = require("@models/AssistedUser");

class IndexAssistedService {
  async execute() {
    const assisted = await AssistedUser.find();

    return assisted;
  }
}

module.exports = IndexAssistedService;
