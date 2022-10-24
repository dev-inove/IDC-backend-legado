const Yup = require('yup');

async function AssociateAssistedWithMemberFamilyValidation(
  request,
  response,
  next,
) {
  const schema = Yup.object().shape({
    CPFAssisted: Yup.string()
      .required('O cpf do assistido deve ser informado.')
      .typeError('O cpf do assistido deve ser um texto.'),
    CPFMemberFamily: Yup.string()
      .required('Cpf do membro da familia deve ser informado.')
      .typeError('Cpf do membro da familia deve ser um texto'),
    isResponsible: Yup.boolean()
      .required('Se é o responsável legal deve ser informado.')
      .typeError('Se é o responsável legal deve ser verdadeiro ou falso.'),
  });

  try {
    await schema.validate(request.body, {
      strict: true,
      abortEarly: false,
    });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ error: validationErros });
  }
  return next();
}

module.exports = AssociateAssistedWithMemberFamilyValidation;
