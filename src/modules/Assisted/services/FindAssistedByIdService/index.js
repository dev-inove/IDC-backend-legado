const AssistedUser = require('@modules/Assisted/models/AssistedUser');

class FindAssistedByIdService {
  async execute({assistedId }) {
    const assistedFinded = await AssistedUser.findById(assistedId);

    return assistedFinded;
  }
}
module.exports = FindAssistedByIdService;
