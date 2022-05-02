const Yup = require('yup');

async function CreateMemberFamilyValidation(request, response, next) {
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

  if (!(await schema.isValid(request.body, { strict: true }))) {
    return response.status(400).json({ message: 'Invalid Object' });
  }

  return next();
}

module.exports = CreateMemberFamilyValidation;
