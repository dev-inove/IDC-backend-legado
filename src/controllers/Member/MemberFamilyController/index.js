const CreateMemberFamilyService = require('@service/Member/CreateMemberFamilyService');
const FindAllMemberFamilyByIdAssistedService = require('@service/Member/FindAllMemberFamilyByIdAssistedService');
const UpdateMemberFamilyService = require('@service/Member/UpdateMemberFamilyService');
const DeleteMemberFamilyService = require('@service/Member/DeleteMemberFamilyService');
const FindMemberFamilyByIdService = require('@service/Member/FindMemberFamilyByIdService');

class MemberFamilyController {
  async store(request, response) {
    try {
      const memberFamilyData = request.body;

      const createMemberFamilyService = new CreateMemberFamilyService();

      const memberFamilyCreated = await createMemberFamilyService.execute(
        memberFamilyData,
      );

      return response.status(201).json(memberFamilyCreated);
    } catch (err) {
      const errorMessage = err.message;

      return response.status(400).json({ error: errorMessage });
    }
  }

  async index(request, response) {
    try {
      const { idAssisted } = request.params;

      const findAllMemberFamilyByIdAssistedService =
        new FindAllMemberFamilyByIdAssistedService();

      const membersFamily =
        await findAllMemberFamilyByIdAssistedService.execute({
          idAssisted,
        });

      return response.status(200).json(membersFamily);
    } catch (err) {
      const errorMessage = err.message;

      return response.status(400).json({ error: errorMessage });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const findMemberFamilyByIdService = new FindMemberFamilyByIdService();

      const member = await findMemberFamilyByIdService.execute({
        memberFamilyId: id,
      });

      if (!member) {
        return response
          .status(404)
          .json({ error: 'Membro da família não encontrado' });
      }

      return response.status(202).json(member);
    } catch (err) {
      const errorMessage = err.message;

      return response.status(400).json({ error: errorMessage });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const dataMemberFamilyUpdate = request.body;

      const updateMemberFamilyService = new UpdateMemberFamilyService();

      const memberFamilyUpdated = await updateMemberFamilyService.execute({
        id,
        dataMemberFamilyUpdate,
      });

      return response.status(200).json(memberFamilyUpdated);
    } catch (err) {
      const errorMessage = err.message;

      return response.status(400).json({ error: errorMessage });
    }
  }

  async destroy(request, response) {
    try {
      const { id } = request.params;

      const deleteMemberFamilyService = new DeleteMemberFamilyService();

      const deleteResult = await deleteMemberFamilyService.execute({
        MemberFamiliId: id,
      });

      if (deleteResult)
        return response
          .status(200)
          .json({ message: 'Membro da família deletado com sucesso.' });
      else
        return response
          .status(400)
          .json({ error: 'Falha ao deletar o membro da família.' });
    } catch (err) {
      const errorMessage = err.message;

      return response.status(200).json({ error: errorMessage });
    }
  }
}

module.exports = new MemberFamilyController();
