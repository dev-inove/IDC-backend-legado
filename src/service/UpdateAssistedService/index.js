const AssistedUser = require('@models/AssistedUser');

class UpdateAssistedService {
  async execute({ AssistedId, assistedUpdateData }) {
    const assistedFinded = await AssistedUser.findById(AssistedId);

    await assistedFinded.set(assistedUpdateData);
    await assistedFinded.save();
  }
}
module.exports = UpdateAssistedService;
