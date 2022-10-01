const Yup = require('yup');

async function UpdateUserValidation(request, response, next) {
  const schema = Yup.object().shape({
    name: Yup.string().typeError('O nome deve ser um texto.'),
    email: Yup.string().typeError('O email deve ser um texto.'),
  });

  try {
    await schema.validate(request.body, { strict: true, abortEarly: false });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }

  return next();
}

module.exports = UpdateUserValidation;
