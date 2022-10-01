const Yup = require('yup');

async function DestroyMemberFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    id: Yup.string()
      .required('o id deve ser informado.')
      .typeError('o id deve ser um texto.'),
  });

  try {
    await schema.validate(request.body, {
      strict: true,
      abortEarly: false,
    });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }
  return next();
}

module.exports = DestroyMemberFamilyValidation;
