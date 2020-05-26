const Yup = require('yup');
const MemberFamily = require('../models/MemberFamily');

class ResponsibleController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      kinship: Yup.string().required(),
      name: Yup.string().required(),
      rg: Yup.string().required(),
      cpf: Yup.string().required(),
      fones: Yup.array().of(Yup.string()),
      email: Yup.string().required(),
      renda: Yup.number().required(),
      isResponsable: Yup.boolean().required(),
      responsible: Yup.object().shape({
        idAssisted: Yup.string().required(),
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
}

module.exports = new ResponsibleController();
