const MemberFamily = require('@models/MemberFamily');
const Assisted = require('@models/AssistedUser');

const ReturnByTypeVariableAndEdit = require('@service/ReturnAllMemberFamilyByTypeService');
const ReturnByTypeVariable = require('@service/ReturnMemberFamilyByTypeService');
const CreateMemberFamilyService = require('@service/CreateMemberFamilyService');
const ListMemberFamilyByidAssistedService = require('@service/ListMemberFamilyByIdAssistedService');
const UpdateMemberFamilyService = require('@service/UpdateMemberFamilyService');

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

      const listMemberFamilyByIdAssistedService =
        new ListMemberFamilyByidAssistedService();

      const membersFamily = await listMemberFamilyByIdAssistedService.execute({
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
      const { type } = request.query;

      const member = await ReturnByTypeVariable.exec(type, id);

      if (!member) {
        return response
          .status(404)
          .json({ error: 'Menbro da família não encontrado' });
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

      const memberFamilyUpdated = updateMemberFamilyService.execute({
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
      const { type } = request.query;

      const member = await ReturnByTypeVariableAndEdit.exec(type, id);

      if (member.isResponsible) {
        member.idAssisted.map(async assisted => {
          const element = await Assisted.findById({ _id: assisted });
          element.id_Responsible = null;
          delete element.id_Responsible;
          element.save();
          return element;
        });
      }

      await member.remove();

      return response
        .status(204)
        .json({ message: 'Menbro da família deletado com sucesso.' });
    } catch (err) {
      const errorMessage = err.message;

      return response.status(401).json({ error: errorMessage });
    }
  }
}

module.exports = new MemberFamilyController();
