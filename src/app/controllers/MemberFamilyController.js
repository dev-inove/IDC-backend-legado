const Yup = require('yup');
const MemberFamily = require('../models/MemberFamily');

class ResponsibleController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      idAssisted: Yup.string().required(),
      kinship: Yup.string().required(),
      name: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      fones: Yup.array().of(Yup.string()),
      email: Yup.string().required(),
      renda: Yup.number().required(),
      isResponsable: Yup.boolean().required(),
      responsible: Yup.object().shape({
        rg: Yup.string().required(),
        responsibleValidator: Yup.string().required(),
        organization: Yup.string().required(),
        validity: Yup.string().required(),
      }),
      wasAttended: Yup.boolean().required(),
      doMedicalTreatment: Yup.boolean().required(),
      useContinuosMedication: Yup.boolean().required(),
      typeOfDisiase: Yup.string().required(),
    });
    if (!schema.isValid(req.body)) {
      return res.status(400).json({ message: 'Invalid Object' });
    }
    const memberFamily = new MemberFamily(req.body);
    memberFamily.save();
    return res.status(201).json(memberFamily);
  }

  async index(req, res, next) {
    const { id_AssistedUser } = req.params;
    const members = await MemberFamily.find({
      idAssisted: id_AssistedUser,
    }).populate('idAssisted', 'fullName');

    if (members.length === 0) {
      return res.status(400).json({
        message: "This user don't have members of family in the system",
      });
    }
    return res.status(200).json({ members });
  }
}

module.exports = new ResponsibleController();
