const AssistedUser = require('@modules/Assisted/models/AssistedUser');

class UpdateAssistedService {
  async execute({ AssistedId, assistedUpdateData }) {
    const assistedFinded = await AssistedUser.findById(AssistedId);

    await assistedFinded.set(assistedUpdateData);
    await assistedFinded.save();

    return assistedFinded;
  }
}
module.exports = UpdateAssistedService;
