const MemberFamily = require('@models/MemberFamily');
const Assisted = require('@models/AssistedUser');

const ReturnByTypeVariableAndEdit = require('@service/ReturnAllMemberFamilyByTypeService');
const ReturnByTypeVariable = require('@service/ReturnMemberFamilyByTypeService');
const CreateMemberFamilyService = require('@service/CreateMemberFamilyService');

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
    const { idAssisted } = request.params;
    const members = await MemberFamily.find({
      idAssisted,
    }).populate('idAssisted', 'fullName');

    if (members.length === 0) {
      return response.status(400).json({
        message: "This user don't have members of family in the system",
      });
    }
    return response.status(200).json({ members });
  }

  async show(request, response) {
    const { id } = request.params;
    const { type } = request.query;

    const member = await ReturnByTypeVariable.exec(type, id);

    if (member === undefined || member === null) {
      return response
        .status(400)
        .json({ message: 'Member of Family not found' });
    }
    return response.status(202).json({ member });
  }

  async update(request, response) {
    const { id } = request.params;
    const { type } = request.query;

    const isResponsibleBody = request.body.isResponsible;

    const member = await ReturnByTypeVariableAndEdit.exec(type, id);

    const { CPFAssisted } = request.body;

    const assistedUser = await Assisted.findOne({ cpf: CPFAssisted });

    if (member.isResponsible === true && isResponsibleBody === false) {
      assistedUser.id_Responsible = null;
      delete assistedUser.id_Responsible;
      assistedUser.save();
    }

    if (member.isResponsible === false && isResponsibleBody === true) {
      if (!member.idAssisted.includes(assistedUser.id)) {
        return response.status(401).json({
          message: 'This Assisted and Member are not parents',
        });
      }

      if (assistedUser.id_Responsible === undefined) {
        assistedUser.set('id_Responsible', member._id);
      } else if (assistedUser.id_Responsible === null) {
        assistedUser.set('id_Responsible', member._id);
      } else {
        return response
          .status(401)
          .json({ message: 'this user alredy has a Responsible' });
      }
      try {
        await assistedUser.save();
      } catch (error) {
        return response.status(400).json({ message: error });
      }
    }
    try {
      member.set(request.body);

      await member.save();
      return response.status(204).json({ member_updated: member });
    } catch (error) {
      return response.status(400).json({ message: error });
    }
  }

  async destroy(request, response) {
    const { id } = request.params;
    const { type } = request.query;
    try {
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

      member.remove();
      return response.status(204).json({ message: 'Member deleted!' });
    } catch (err) {
      return response
        .status(401)
        .json({ message: `Member not deleted! ${err}` });
    }
  }
}

module.exports = new MemberFamilyController();
