const AssistedUser = require('@models/AssistedUser');
const MemberFamily = require('@models/MemberFamily');

class DeleteMemberFamilyService {
  async execute({ MemberFamiliId }) {
    const member = MemberFamily.findById(MemberFamiliId);

    if (member.isResponsible) {
      member.idAssisted.map(async assistedId => {
        const assisted = await AssistedUser.findById({ _id: assistedId });

        assisted.id_Responsible = null;
        delete assisted.id_Responsible;

        assisted.save();

        return assisted;
      });
    }

    await member.remove();

    return true;
  }
}

module.exports = DeleteMemberFamilyService;
