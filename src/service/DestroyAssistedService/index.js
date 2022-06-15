const AssistedUser = require('@models/AssistedUser');
const MemberFamily = require('@models/MemberFamily');

class DestroyAssistedService {
  async execute({ assistedId, destroy_members }) {
    const assistedFinded = await AssistedUser.findById(assistedId);

    await assistedFinded.remove();

    if (destroy_members) {
      const members = await MemberFamily.find({
        idAssisted: assistedFinded._id,
      });

      await members.remove();
    }

    return true;
  }
}
module.exports = DestroyAssistedService;