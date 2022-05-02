const Yup = require('yup');

async function CreateUserValidation(request, response, next) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(request.body, { strict: true }))) {
    return response.status(400).json({ message: 'Format invalid' });
  }

  return next();
}

module.exports = CreateUserValidation;
