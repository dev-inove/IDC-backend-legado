const AssistedUser = require('@models/AssistedUser');

class FindAssistedByIdService {
  async execute({ assistedId }) {
    const assistedFinded = await AssistedUser.findById(assistedId);

    return assistedFinded;
  }
}
module.exports = FindAssistedByIdService;
