const Yup = require('yup');

async function UpdateUserValidation(request, response, next) {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    newPassword: Yup.string(),
    confirmNewPassword: Yup.string(),
  });

  if (!(await schema.isValid(request.body, { strict: true }))) {
    return response.status(400).json({ message: 'Format invalid' });
  }

  return next();
}

module.exports = UpdateUserValidation;
