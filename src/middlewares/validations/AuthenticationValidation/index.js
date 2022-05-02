const Yup = require('yup');

async function AuthenticationValidation(request, response, next) {
  const schema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(request.body, { strict: true }))) {
    return response.status(400).json({ message: 'invalid format' });
  }

  return next();
}

module.exports = AuthenticationValidation;
