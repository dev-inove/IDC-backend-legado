const Yup = require('yup');

async function DestroyAssistedValidation(request, response, next) {
  const schema = Yup.object().shape({
    id: Yup.string()
      .required('O id deve ser informado.')
      .typeError('O id deve ser um texto.'),
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

module.exports = DestroyAssistedValidation;
