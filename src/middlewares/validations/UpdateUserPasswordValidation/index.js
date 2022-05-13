const Yup = require('yup');

async function UpdateUserPasswordValidation(request, response, next) {
  const schema = Yup.object().shape({
    password: Yup.string().typeError('A senha deve ser um texto.'),
    newPassword: Yup.string().typeError('A nova senha deve ser um texto.'),
    confirmNewPassword: Yup.string().typeError(
      'A confirmação da nova senha deve ser um texto.',
    ),
  });

  try {
    await schema.validate(request.body, { strict: true, abortEarly: false });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }

  return next();
}

module.exports = UpdateUserPasswordValidation;
