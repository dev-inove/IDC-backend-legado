const Yup = require('yup');

async function ListMembersFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    idAssisted: Yup.string()
      .required('O id do assistido deve ser informado')
      .typeError('O id do assistido deve ser um texto'),
  });

  try {
    await schema.validate(request.params, { strict: true, abortEarly: false });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }

  return next();
}

module.exports = ListMembersFamilyValidation;
