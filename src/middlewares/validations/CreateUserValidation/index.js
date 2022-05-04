const Yup = require('yup');

async function CreateUserValidation(request, response, next) {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required('O nome deve ser informado')
      .typeError('O nome deve ser um texto'),
    email: Yup.string()
      .required('O email deve ser informado')
      .typeError('O email deve ser um texto'),
    password: Yup.string()
      .required('A senha deve ser informado')
      .typeError('A senha deve ser um texto'),
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

module.exports = CreateUserValidation;
