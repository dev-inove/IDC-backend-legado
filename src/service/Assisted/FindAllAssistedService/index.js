const AssistedUser = require('@models/AssistedUser');

class FindAllAssistedService {
  async execute() {
    const assisteds = await AssistedUser.find();

    return assisteds;
  }
}

module.exports = FindAllAssistedService;
