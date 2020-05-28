const Yup = require('yup');
const MemberFamily = require('../models/MemberFamily');
const Assisted = require('../models/AssistedUser');

class MemberFamilyController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      idAssisted: Yup.string().required(),
      kinship: Yup.string().required(),
      name: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      fones: Yup.array().of(Yup.number()).required(),
      email: Yup.string().required(),
      renda: Yup.number().required(),
      isResponsible: Yup.boolean().required(),
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
    const { idAssisted } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid Object' });
    }
    const memberFamily = new MemberFamily(req.body);
    if (memberFamily.isResponsible === true) {
      const assistedUser = await Assisted.findById(idAssisted);
      // eslint-disable-next-line no-underscore-dangle
      assistedUser.id_Responsible = memberFamily._id;
      assistedUser.save();
    }

    memberFamily.save();

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
}

module.exports = new MemberFamilyController();
