const AssistedUser = require('@models/AssistedUser');
const MemberFamily = require('@models/MemberFamily');

class DestroyAssistedService {
  async execute({assistedId, destroy_members}) {
    const assistedFinded= await AssistedUser.findById(assistedId);
    const destroy = await AssistedUser.find(destroy_members);

    if (destroy) {
      const members = await MemberFamily.find({
        idAssisted: AssistedUser.AssistedId,
      });

      await members.remove();

      return true;
    }
  }
}
module.exports = DestroyAssistedService;
