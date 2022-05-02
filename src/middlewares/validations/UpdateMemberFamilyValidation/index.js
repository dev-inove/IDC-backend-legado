const Yup = require('yup');

async function UpdateMemberFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    CPFAssisted: Yup.string(),
    kinship: Yup.string(),
    name: Yup.string(),
    rg: Yup.string(),
    cpf: Yup.string(),
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
    wasAttended: Yup.boolean(),
    doMedicalTreatment: Yup.boolean(),
    useContinuosMedication: Yup.boolean(),
    typeOfDisiase: Yup.string(),
  });

  if (!(await schema.isValid(request.body, { strict: true }))) {
    return response.status(400).json({ message: 'Invalid Object' });
  }

  return next();
}

module.exports = UpdateMemberFamilyValidation;
