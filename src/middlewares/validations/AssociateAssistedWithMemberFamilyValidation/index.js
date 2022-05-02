const Yup = require('yup');

async function AssociateAssistedWithMemberFamilyValidation(
  request,
  response,
  next,
) {
  const schema = Yup.object().shape({
    CPFAssisted: Yup.string().required(),
    CPFMemberFamily: Yup.string().required(),
    isResponsible: Yup.boolean().required(),
  });

  if (!(await schema.isValid(request.body, { strict: true }))) {
    return response.status(400).json({ message: 'validations fails' });
  }

  return next();
}

module.exports = AssociateAssistedWithMemberFamilyValidation;
