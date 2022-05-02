const Yup = require('yup');

async function ShowAssistedValidation(request, response, next) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
  });

  if (!(await schema.isValid(request.params, { strict: true }))) {
    return response.status(400).json({ error: 'Validation fails!' });
  }

  return next();
}

module.exports = ShowAssistedValidation;
