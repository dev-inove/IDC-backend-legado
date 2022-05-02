const Yup = require('yup');

async function ListMembersFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    idAssisted: Yup.string().required(),
  });

  if (!(await schema.isValid(request.params, { strict: true }))) {
    return response.status(400).json({ message: 'This Id is invalid!' });
  }
  return next();
}

module.exports = ListMembersFamilyValidation;
