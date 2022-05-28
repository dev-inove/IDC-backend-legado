const AssistedUser = require("@models/AssistedUser");

class FindAllAssistedService {
  async execute() {
    const assisted = await AssistedUser.find();

    return assisted;
  }
}

module.exports = FindAllAssistedService;
