const AssistedUser = require('@models/AssistedUser');
const MemberFamily = require('@models/MemberFamily');

class UpdateMemberFamilyService {
  async execute({ memberId, dataMemberFamilyUpdate }) {
    const member = await MemberFamily.findById(memberId);

    const isResponsibleBody = dataMemberFamilyUpdate.isResponsible;

    const { CPFAssisted } = dataMemberFamilyUpdate;

    const assistedUser = await AssistedUser.findOne({ cpf: CPFAssisted });

    if (member.isResponsible === true && isResponsibleBody === false) {
      assistedUser.id_Responsible = null;
      delete assistedUser.id_Responsible;
      await assistedUser.save();
    }

    if (member.isResponsible === false && isResponsibleBody === true) {
      if (!member.idAssisted.includes(assistedUser.id)) {
        throw new Error(
          'Esse assistido e esse mebro da família não são parentes.',
        );
      }

      if (assistedUser.id_Responsible === undefined) {
        assistedUser.set('id_Responsible', member._id);
      } else if (assistedUser.id_Responsible === null) {
        assistedUser.set('id_Responsible', member._id);
      } else {
        throw new Error(
          'Esse menbro da família já é responsável por esse assistido.',
        );
      }
      try {
        await assistedUser.save();
      } catch (err) {
        const errorMessage = err.message;

        throw new Error(errorMessage);
      }
    }

    try {
      member.set(dataMemberFamilyUpdate);

      await member.save();

      return member;
    } catch (err) {
      const errorMessage = err.message;

      throw new Error(errorMessage);
    }
  }
}

module.exports = UpdateMemberFamilyService;
