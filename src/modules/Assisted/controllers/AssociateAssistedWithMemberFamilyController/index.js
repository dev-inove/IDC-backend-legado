const AssociateAssistedWithMemberFamilyService = require('@modules/Assisted/services/AssociateAssistedMemberFamilyService');
const MemberFamily = require('@modules/MemberFamily/models/MemberFamily');
const AssistedUser = require('@modules/Assisted/models/AssistedUser');
// Esse controller é usado apenas quando quero fazer a associação rápida
// entre asssitido e membro da familia
class AssociateAssistedWithMemberFamilyController {
  async update(request, response) {
    try {
      const { CPFAssisted, CPFMemberFamily, isResponsible } = request.body;

      const assisted =  await AssistedUser.findOne({ CPFAssisted });

      const member = await MemberFamily.findOne({ CPFMemberFamily });
      
      if (!assisted || !member) {
        throw new Error('Cheque os dados e tente novamente');
      }

      if (member.idAssisted.includes(assisted.id)) {
        throw new Error('Assistido ja esta incluso em membro da familia');
      }

      if(isResponsible && 
        assisted.id_Responsible !== null &&
        assisted.id_Responsible !== undefined){
          throw new Error(
            'O assistido já possui um Responsável, desmarque a opção de responsável e tente novamente.',
          );
        }

      const associateAssistedWithMemberFamilyService =
        new AssociateAssistedWithMemberFamilyService();

      await associateAssistedWithMemberFamilyService.execute({
        assisted,
        member,
        isResponsible,
      });

      return response
        .status(201)
        .json({ message: 'Usuário associado com sucesso!' });
    } catch (err) {
      const messageError = err.message;

      return response.status(400).json({ error: messageError });
    }
  }
}

module.exports = new AssociateAssistedWithMemberFamilyController();
