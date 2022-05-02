const Yup = require('yup');

async function DestroyMemberFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
  });

  if (!(await schema.isValid(request.params, { strict: true }))) {
    return response.status(400).json({ message: 'Invalid Id!' });
  }

  return next();
}

module.exports = DestroyMemberFamilyValidation;
