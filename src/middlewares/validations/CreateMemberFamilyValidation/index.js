const Yup = require('yup');

async function CreateMemberFamilyValidation(request, response, next) {
  const schema = Yup.object().shape({
    cpf_assisted: Yup.string()
      .required('O cpf do assistido deve ser informado')
      .typeError('O cpf do assistido deve ser um texto'),
    kinship: Yup.string()
      .required('O parentesco deve ser informado')
      .typeError('O parentesco deve ser um texto'),
    name: Yup.string()
      .required('O nome deve ser informado')
      .typeError('O nome deve ser um texto'),
    rg: Yup.string()
      .required('O registro geral deve ser informado')
      .typeError('O registro geral deve ser um texto'),
    cpf: Yup.string()
      .required('O cpf deve ser informado')
      .typeError('O cpf deve ser um texto'),
    fones: Yup.array()
      .of(Yup.number())
      .required('Os telefones devem ser informado')
      .typeError('Os telefones devem ser um número valido'),
    email: Yup.string()
      .required('O email  deve ser informado')
      .typeError('O email deve ser um texto'),
    renda: Yup.number()
      .required('A renda deve ser informado')
      .typeError('A renda deve ser um texto'),
    isResponsible: Yup.boolean()
      .required('Se for o responsável deve ser informado')
      .typeError('Se for o responsável deve ser verdadeiro ou falso'),
    responsible: Yup.object().shape({
      rg: Yup.string()
        .required('O rg deve ser informado')
        .typeError('O rg deve ser um texto'),
      responsibleValidator: Yup.string()
        .required('O cpf do assistido deve ser informado')
        .typeError('O cpf do assistido deve ser um texto'),
      organization: Yup.string()
        .required('A organização deve ser informado')
        .typeError('A organização deve ser um texto'),
      validity: Yup.string()
        .required('A validade deve ser informado')
        .typeError('A validade deve ser um texto'),
    }),
    wasAttended: Yup.boolean()
      .required('Se ja foi atendido deve ser informado')
      .typeError('Se ja foi atendido deve ser verdadeiro ou falso'),
    doMedicalTreatment: Yup.boolean()
      .required('Se faz algum tratamento medico deve ser informado')
      .typeError('Se faz algum tratamento medico deve ser verdadeiro ou falso'),
    useContinuosMedication: Yup.boolean()
      .required('Se faz uso continuo de medicamentos deve informado')
      .typeError(
        'Se faz uso continuo de medicamentos deve ser verdadeiro ou falso',
      ),
    typeOfDisease: Yup.string()
      .required('O tipo de doença deve ser informado')
      .typeError('O tipo de doença deve ser um texto'),
  });

  try {
    await schema.validate(request.body, {
      strict: true,
      abortEarly: false,
    });
  } catch (err) {
    const validationErros = err.errors;

    return response.status(400).json({ errors: validationErros });
  }
  return next();
}

module.exports = CreateMemberFamilyValidation;
