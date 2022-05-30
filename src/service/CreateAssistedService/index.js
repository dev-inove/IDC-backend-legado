const AssistedUser = require('@models/AssistedUser');

class CreateAssistedService {
  async execute(assistedData) {
    const assistedCreated = await AssistedUser.create(assistedData);

    return assistedCreated;
  }
}
module.exports = CreateAssistedService;
