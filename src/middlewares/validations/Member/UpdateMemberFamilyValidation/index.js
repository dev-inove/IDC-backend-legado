const Yup = require('yup');

async function UpdateMemberFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    CPFAssisted: Yup.string().typeError(
      'O CPF do assistido deve ser um texto.',
    ),
    kinship: Yup.string().typeError('O parentesco deve ser um texto.'),
    name: Yup.string().typeError('O nome deve ser um texto.'),
    rg: Yup.string().typeError('O rg deve ser um texto.'),
    cpf: Yup.string().typeError('o cpf deve ser um texto.'),
    fones: Yup.array().of(
      Yup.number().typeError('O telefone deve ser um número.'),
    ),
    email: Yup.string().typeError('O email deve ser umm texto.'),
    renda: Yup.number().typeError('A renda deve ser um número.'),
    isResponsible: Yup.boolean().typeError(
      'A responsabilidade deve ser um boolean.',
    ),
    responsible: Yup.object().shape({
      rg: Yup.string().typeError('O rg do responsável deve ser um texto.'),
      responsibleValidator: Yup.string().typeError(
        'A validação de responsável deve ser um texto.',
      ),
      organization: Yup.string().typeError('A organização deve ser um texto.'),
      validity: Yup.string().typeError('A validade deve ser um texto.'),
    }),
    wasAttended: Yup.boolean().typeError(
      'Se foi atendido deve ser um boolean.',
    ),
    doMedicalTreatment: Yup.boolean().typeError(
      'Se está fazendo tratamento médico deve ser um boolean.',
    ),
    useContinuosMedication: Yup.boolean().typeError(
      'Se faz uso constante de medicamento deve ser um boolean.',
    ),
    typeOfDisiase: Yup.string().typeError(
      'O tipo da doença deve ser um texto.',
    ),
  });

  try {
    await schema.validate(request.body, { strict: true, abortEarly: false });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }

  return next();
}

module.exports = UpdateMemberFamilyValidation;
