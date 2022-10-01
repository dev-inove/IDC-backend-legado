const Yup = require('yup');

async function UpdateUserPasswordWithTokenValidation(request, response, next) {
  const schema = Yup.object().shape({
    token: Yup.string()
      .required('O token é obrigatório para atualizar a senha.')
      .typeError('O token deve ser um texto.'),
    newPassword: Yup.string()
      .required('A nova senha é obrigatória.')
      .typeError('A nova senha deve ser um texto.'),
    confirmNewPassword: Yup.string()
      .required('A confirmação de nova senha é obrigatória.')
      .typeError('A confirmação de nova senha deve ser um texto.'),
  });

  try {
    await schema.validate(request.body, { strict: true, abortEarly: false });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }

  return next();
}

module.exports = UpdateUserPasswordWithTokenValidation;
