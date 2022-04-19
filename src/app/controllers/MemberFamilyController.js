/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const Yup = require('yup');
const MemberFamily = require('../models/MemberFamily');
const Assisted = require('../models/AssistedUser');

const ReturnByTypeVariable = require('../service/ReturnMemberFamilyByVariableType');
const ReturnByTypeVariableAndEdit = require('../service/ReturnMemberFamilyByVariableTypeAndUpdate');

// const ReturnByTypeAndEditAssisted = require('../service/ReturnAssistedByVariableTypeAndEdit')

class MemberFamilyController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      cpf_assisted: Yup.string().required(),
      kinship: Yup.string().required(),
      name: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      fones: Yup.array().of(Yup.number()),
      email: Yup.string().required(),
      renda: Yup.number(),
      isResponsible: Yup.boolean().required(),
      responsible: Yup.object().shape({
        rg: Yup.string(),
        responsibleValidator: Yup.string(),
        organization: Yup.string(),
        validity: Yup.string(),
      }),
      wasAttended: Yup.boolean(),
      doMedicalTreatment: Yup.boolean(),
      useContinuosMedication: Yup.boolean(),
      typeOfDisiase: Yup.string(),
    });
    const { cpf_assisted } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Object' });
    }
    // crio uma instancia de membro da familia
    const memberFamily = new MemberFamily(req.body);

    // pesquiso o assistido
    const assistedUser = await Assisted.findOne({ cpf: cpf_assisted });

    // caso seja o responsavel pelo assistido
    if (memberFamily.isResponsible === true) {
      if (!assistedUser) {
        return res.status(400).json({
          message: 'User not found, try again with another CPF',
        });
      }
      // verifica se o assistido já tem responsável
      if (
        assistedUser.id_Responsible !== undefined &&
        assistedUser.id_Responsible !== null
      ) {
        return res.status(401).json('This Assisted already has a Responsible');
      }

      // caso o assistido nn tenho responsável, faz a associação
      assistedUser.id_Responsible = memberFamily._id;
      memberFamily.idAssisted.push(assistedUser._id);
      assistedUser.save();
    }

    // obs: provavelmente seja um if desnecessário
    if (memberFamily.idAssisted.length === 0) {
      memberFamily.idAssisted.push(assistedUser._id);
    }

    // salvar no banco o membro da familia
    try {
      await memberFamily.save();
    } catch (error) {
      return res.status(400).json({ message: error });
    }

    return res.status(201).json(memberFamily);
  }

  async index(req, res, next) {
    const schema = Yup.object().shape({
      idAssisted: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ message: 'This Id is invalid!' });
    }
    const { idAssisted } = req.params;
    const members = await MemberFamily.find({
      idAssisted,
    }).populate('idAssisted', 'fullName');

    if (members.length === 0) {
      return res.status(400).json({
        message: "This user don't have members of family in the system",
      });
    }
    return res.status(200).json({ members });
  }

  async show(req, res, next) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ message: 'This Id is invalid! rapa' });
    }

    const { id } = req.params;
    const { type } = req.query;

    const member = await ReturnByTypeVariable.exec(type, id);

    if (member === undefined || member === null) {
      return res.status(400).json({ message: 'Member of Family not found' });
    }
    return res.status(202).json({ member });
  }

  async update(req, res, next) {
    const schema = Yup.object().shape({
      CPFAssisted: Yup.string(),
      kinship: Yup.string().required(),
      name: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      fones: Yup.array().of(Yup.number()),
      email: Yup.string(),
      renda: Yup.number(),
      isResponsible: Yup.boolean(),
      responsible: Yup.object().shape({
        rg: Yup.string(),
        responsibleValidator: Yup.string(),
        organization: Yup.string(),
        validity: Yup.string(),
      }),
      wasAttended: Yup.boolean().required(),
      doMedicalTreatment: Yup.boolean().required(),
      useContinuosMedication: Yup.boolean().required(),
      typeOfDisiase: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Object' });
    }
    const { id } = req.params;
    const { type } = req.query;

    // verifica se ele vai ser o responsável
    const isResponsibleBody = req.body.isResponsible;

    // pegamos o membro da familia
    const member = await ReturnByTypeVariableAndEdit.exec(type, id);

    const { CPFAssisted } = req.body;

    // buscamos o assistido
    const assistedUser = await Assisted.findOne({ cpf: CPFAssisted });

    // caso seja responsável e nn queira mais ser
    if (member.isResponsible === true && isResponsibleBody === false) {
      // desassociar o id de responsável no assistido
      assistedUser.id_Responsible = null;
      delete assistedUser.id_Responsible; // delete usado para excluir apenas o id_Responsible
      assistedUser.save();
    }
    // caso ele queira ser o responsável
    if (member.isResponsible === false && isResponsibleBody === true) {
      // verifica se eles são parentes
      if (!member.idAssisted.includes(assistedUser.id)) {
        return res.status(401).json({
          message: 'This Assisted and Member are not parents',
        });
      }

      // verifica se já tem responsável
      if (assistedUser.id_Responsible === undefined) {
        assistedUser.set('id_Responsible', member._id);
      } else if (assistedUser.id_Responsible === null) {
        assistedUser.set('id_Responsible', member._id);
      } else {
        return res
          .status(401)
          .json({ message: 'this user alredy has a Responsible' });
      }
      try {
        await assistedUser.save();
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    }
    try {
      member.set(req.body);

      await member.save();
      return res.status(204).json({ member_updated: member });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async destroy(req, res, next) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ message: 'Invalid Id!' });
    }
    const { id } = req.params;
    const { type } = req.query;
    try {
      const member = await ReturnByTypeVariableAndEdit.exec(type, id);

      // forma de deletar o membro caso ele seja responsável de alguém
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
      return res.status(204).json({ message: 'Member deleted!' });
    } catch (err) {
      return res.status(401).json({ message: `Member not deleted! ${err}` });
    }
  }
}

module.exports = new MemberFamilyController();
