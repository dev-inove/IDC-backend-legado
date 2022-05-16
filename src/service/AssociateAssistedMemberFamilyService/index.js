const User = require('@models/User');
const MemberFamily = require('@models/MemberFamily');
const AssistedUser = require('@models/AssistedUser');

class AssociateAssistedWithMemberFamilyService {
  async execute({ CPFAssisted, CPFMemberFamily, isResponsible }) {
    const assisted = await MemberFamily.findOne({ CPFMemberFamily });

    const responsible = await MemberFamily.findOne({ isResponsible });

    const member = await AssistedUser.findOne({ CPFAssisted });

    if (!assisted || !member)
      throw new Error('Cheque os dados e tente novamente');

    if (member.idAssisted.includes(assisted.id))
      throw new Error('Assistido ja esta incluso em membro da familia');

    if (responsible) {
      if (
        assisted.id_Responsible !== null &&
        assisted.id_Responsible !== undefined
      ) {
        throw new Error(
          'o usuário ja é um responsável, tente desmarcar a opção de responsável de novo.',
        );
      }
      member.isResponsible = true;
      member.idAssisted.push(assisted.id);
      assisted.id_Responsible = member.id;
      await member.save();
      await assisted.save();
    } else {
      member.idAssisted.push(assisted.id);
      await member.save();
    }
  }
}

module.exports = AssociateAssistedWithMemberFamilyService;
