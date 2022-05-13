const Yup = require('yup');

async function UpdateUserPasswordValidation(request, response, next) {
  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .typeError('A nova senha deve ser um texto.')
      .required('A nova senha deve ser informada!'),
    confirmNewPassword: Yup.string()
      .typeError('A confirmação da nova senha deve ser um texto.')
      .required('A confirmação da nova senha deve ser informada!'),
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
