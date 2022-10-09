const MemberFamily = require('@modules/MemberFamily/models/MemberFamily');
const AssistedUser = require('@modules/Assisted/models/AssistedUser');

class CreateMemberFamilyService {
  async execute(memberFamilyData) {
    const { cpf_assisted } = memberFamilyData;

    const memberFamily = new MemberFamily(memberFamilyData);

    const assistedUser = await AssistedUser.findOne({ cpf: cpf_assisted });

    if (memberFamily.isResponsible === true) {
      if (!assistedUser) {
        throw new Error(
          'Assistido não encontrado, verifique o cpf e tente novamente!',
        );
      }

      if (
        assistedUser.id_Responsible !== undefined &&
        assistedUser.id_Responsible !== null
      ) {
        throw new Error(
          'O assistido já possui um responsável, desmarque a opção de responsável e cadastre o menbro novamente!',
        );
      }

      assistedUser.id_Responsible = memberFamily._id;
      memberFamily.idAssisted.push(assistedUser._id);
      await assistedUser.save();
    }

    if (memberFamily.idAssisted.length === 0) {
      memberFamily.idAssisted.push(assistedUser._id);
    }

    await memberFamily.save();

    return memberFamily;
  }
}

module.exports = CreateMemberFamilyService;
