const AssociateAssistedWithMemberFamilyService = require('@service/AssociateAssistedMemberFamilyService');

// Esse controller é usado apenas quando quero fazer a associação rápida
// entre asssitido e membro da familia
class AssociateAssistedWithMemberFamilyController {
  async update(request, response) {
    try {
      const { CPFAssisted, CPFMemberFamily, isResponsible } = request.body;

      const associateAssistedWithMemberFamilyService =
        new AssociateAssistedWithMemberFamilyService();

      await associateAssistedWithMemberFamilyService.execute({
        CPFAssisted,
        CPFMemberFamily,
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
