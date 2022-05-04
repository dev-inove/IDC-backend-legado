const Yup = require('yup');

async function ShowMemberFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    id: Yup.string()
      .required('O id do membro da família deve ser informado.')
      .typeError('O id do membro da família deve ser um texto'),
  });

  try {
    await schema.validate(request.params, { strict: true, abortEarly: false });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }

  return next();
}

module.exports = ShowMemberFamilyValidation;
