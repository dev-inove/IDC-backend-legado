const AssistedUser = require('@modules/Assisted/models/AssistedUser');

class FindAllAssistedService {
  async execute() {
    const assisteds = await AssistedUser.find();

    return assisteds;
  }
}

module.exports = FindAllAssistedService;
