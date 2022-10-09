const Yup = require('yup');

async function ForgotPasswordValidation(request, response, next) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('O email é obrigatório para solicitar a alteração de senha.')
      .typeError('O email deve ser um texto.'),
  });

  try {
    await schema.validate(request.body, { strict: true, abortEarly: false });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }

  return next();
}

module.exports = ForgotPasswordValidation;
