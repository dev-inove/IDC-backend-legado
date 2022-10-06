const Yup = require('yup');

async function CreateAssistedValidation(request, response, next) {
  const schema = Yup.object().shape({
    fullName: Yup.string()
      .required('O nome completo deve ser informado.')
      .typeError('O nome deve ser um texto.'),
    socialName: Yup.string()
      .required('O nome social deve ser informado.')
      .typeError('O nome social deve ser um texto.'),
    maritalStatus: Yup.string()
      .required('O estado civil deve ser informado.')
      .typeError('O estado civil deve ser um texto.'),
    email: Yup.string()
      .required('O email deve informado.')
      .typeError('O email deve ser um texto.'),
    phone: Yup.number()
      .positive('O número de telefone deve ser positivo')
      .required('O número de telefone deve ser informado.')
      .typeError('O número telefone deve ser um numero valido.'),
    birth: Yup.date()
      .required('A data de nascimento deve ser informado.')
      .typeError('A data de nascimento deve ser uma data valida.'),
    sex: Yup.string()
      .required('O sexo deve ser informado.')
      .typeError('O sexo deve ser um texto.'),
    nationality: Yup.string()
      .required('A nacionalidade deve ser informada.')
      .typeError('A nacionalidade deve ser um texto.'),
    placeOfBirth: Yup.string()
      .required('O local de nascimento deve ser informado.')
      .typeError('O local de nascimento deve ser um texto.'),
    hasDeficiency: Yup.boolean()
      .required('Se possui alguma deficiência deve ser informada.')
      .typeError('Se possui alguma deficiência deve ser verdadeiro ou falso.'),
    deficiency: Yup.string()
      .required('A deficiência deve ser informada.')
      .typeError('A deficiência deve ser um texto.'),

    address: Yup.object().shape({
      address: Yup.string()
        .required('O endereço deve ser informado.')
        .typeError('O endereço deve ser um texto.'),
      number: Yup.string()
        .required('O número deve ser informado.')
        .typeError('O número deve ser um inteiro.'),
      neighborhood: Yup.string()
        .required('O nome do bairro deve ser informado.')
        .typeError('O nome do bairro deve ser um texto.'),
      city: Yup.string()
        .required('A cidade deve ser informado.')
        .typeError('A cidade deve ser um texto.'),
      state: Yup.string()
        .required('O estado deve ser informado.')
        .typeError('O estado deve ser um texto.'),
      cep: Yup.number()
        .positive('o código postal deve ser um numero positivo.')
        .required('O código postal ser informado.')
        .typeError('O código postal deve ser um numero valido.'),
      referencePoint: Yup.string()
        .required('O local de referência deve ser informado.')
        .typeError('O local de referência deve ser um texto.'),
    }),

    identity: Yup.number()
      .positive('o número da indentidade deve ser positivo')
      .required('O número da indentidade deve ser informado.')
      .typeError('O número da indentidade  deve ser um numero valido.'),
    cpf: Yup.string()
      .required('O cpf deve ser informado.')
      .typeError('O cpf deve ser um número valido.'),
    Department: Yup.string()
      .required('O departamento deve ser informado.')
      .typeError('O departamento deve ser um texto.'),
    emission: Yup.date()
      .required('A data de emissão deve ser informado.')
      .typeError('A data de emissão deve ser uma data valida.'),
    diagnostic: Yup.string()
      .required('O diagnostico deve ser informado.')
      .typeError('O diagnostico ser um texto.'),
    visualAcuity: Yup.string()
      .required('A acuidade visual deve ser informado.')
      .typeError('A acuidade visual deve ser um texto.'),
    cid10: Yup.string()
      .required('O código internacional de doenças deve ser informado.')
      .typeError('O código internacional de doenças deve ser um texto.'),

    hasARelativeAttended: Yup.boolean()
      .required('Se ja teve um parente atendido deve ser informado.')
      .typeError(
        'Se ja teve um parente atendido deve ser verdadeiro ou falso.',
      ),
    relativeAttended: Yup.string()
      .required('O parente atendido deve ser informado.')
      .typeError('O parente atendido deve ser um texto.'),
    transport: Yup.string()
      .required('O tipo de transporte deve ser informado.')
      .typeError('O tipo de transporte deve ser um texto.'),
    isInGovernmentProgram: Yup.boolean()
      .required('Se participa de um programa do governo deve ser informado.')
      .typeError(
        'Se participa de um programa do governo ser verdadeiro ou falso.',
      ),
    governmentProgram: Yup.string()
      .required('O programa do governo que participa deve ser informado.')
      .typeError('O programa do governo que participa deve ser um texto.'),
    governmentProgramValue: Yup.number()
      .positive()
      .required(
        'O valor que recebia do programa do governo deve ser informado.',
      )
      .typeError('O valor que recebia do programa do governo ser um numero.'),
    beneficiary: Yup.string()
      .required('O beneficiário deve ser informado.')
      .typeError('O beneficiário deve ser um texto.'),
    nisNumber: Yup.number()
      .positive('O número de indetificação social deve ser positivo ')
      .required('O número de indetificação social deve ser informado.')
      .typeError('O número deve ser um número valido.'),

    schooling: Yup.object().shape({
      grade: Yup.string()
        .required('O grau de escolaridade deve ser informado.')
        .typeError('O grau de escolaridade deve ser um texto.'),
      turn: Yup.string()
        .required('O turno escolar deve ser informado.')
        .typeError('O turno escolar deve ser um texto.'),
      hasVinculeHelioGoes: Yup.boolean()
        .required('Se possui um vinculo helio goes deve ser informado.')
        .typeError(
          'Se possui um vinculo helio goes deve ser verdadeiro ou falso.',
        ),
      transportToInstitute: Yup.string()
        .required(
          'O Transporte escolhido para ir ao instituto deve ser informado.',
        )
        .typeError(
          'O Transporte escolhido para ir ao instituto deve ser um texto.',
        ),
      hasMemberMatriculatedOrWillMatriculate: Yup.boolean()
        .required(
          'Se possui um familiar matriculado ou que ainda vai se matricular em uma instituição de ensino deve ser informado.',
        )
        .typeError(
          'Se possui um familiar matriculado ou que ainda vai se matricular em uma instituição de ensino deve ser verdadeiro ou falso.',
        ),
    }),

    property: Yup.object().shape({
      type_property: Yup.string()
        .required('O tipo de propriedade deve ser informado.')
        .typeError('O tipo de propriedade deve ser um texto.'),
      physical_structure: Yup.string()
        .required('A estrutura física deve ser informado.')
        .typeError('A estrutura física deve ser um texto.'),
      numberOfRooms: Yup.number()
        .positive('O número de quartos deve ser positivo')
        .required('O número de quartos deve ser informado.')
        .typeError('O número de quartos deve ser um número valido.'),
      numberOfBathrooms: Yup.number()
        .positive('O número de banheiros deve ser positivo')
        .required('A número de banheiros deve ser informado.')
        .typeError('A número de banheiros deve ser um número valido.'),
      energyElectric: Yup.string()
        .required('A energia elétrica deve ser informado.')
        .typeError('A energia elétrica deve ser um texto.'),
      waterSupply: Yup.string()
        .required('O abastecimento de agua deve ser informado.')
        .typeError('O abastecimento deve ser um texto'),
      sanitarySewage: Yup.boolean()
        .required('Se possui um esgoto sanitário deve ser informado.')
        .typeError('Se possui um esgoto sanitário.'),
      garbageCollection: Yup.boolean()
        .required('Se possui coleta de lixo deve ser informado.')
        .typeError('Se possui coleta de lixo deve ser verdadeiro ou falso.'),
      statusProperty: Yup.string()
        .required('O estado atual da propriedade deve ser informado.')
        .typeError('O estado atual da propriedade deve ser um texto.'),
      monthlyRent: Yup.number()
        .positive('A rentabilidade mensal deve ser um número positivo')
        .required('A rentabilidade mensal deve ser informado.')
        .typeError('A rentabilidade mensal deve ser um número valido.'),
      monthlyFinancing: Yup.number()
        .positive('o financiamento mensal deve ser um número positivo')
        .required('O financiamento mensal deve ser informado.')
        .typeError('O financiamento mensal deve ser um número valido.'),
      isSharedWithOtherFamily: Yup.boolean()
        .required(
          'Se é compartilhado com outros familiares deve ser informado.',
        )
        .typeError(
          'Se é compartilhado com outros familiares deve ser verdadeiro ou falso.',
        ),
      houseProvidedBy: Yup.string()
        .required('O fornecedor da casa deve ser informado.')
        .typeError('O fornecedor da casa deve ser um texto.'),
    }),
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

module.exports = CreateAssistedValidation;
