const Yup = require('yup');

async function ShowMemberFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
  });

  if (!(await schema.isValid(request.params, { strict: true }))) {
    return response.status(400).json({ message: 'This Id is invalid! rapa' });
  }

  return next();
}

module.exports = ShowMemberFamilyValidation;
