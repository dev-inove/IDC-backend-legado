const AssistedUser = require('@modules/Assisted/models/AssistedUser');
const MemberFamily = require('@modules/MemberFamily/models/MemberFamily');

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
