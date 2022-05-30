const AssistedUser = require('@models/AssistedUser');

class ShowAssistedService {
  async execute(AssistedId) {
    const assistedId = await AssistedUser.findById(AssistedId);
  }
}
module.exports = ShowAssistedService;
