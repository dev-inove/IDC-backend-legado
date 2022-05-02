const Yup = require('yup');

async function UpdateAssistedValidation(request, response, next) {
  const schema = Yup.object().shape({
    fullName: Yup.string(),
    socialName: Yup.string(),
    maritalStatus: Yup.string(),
    email: Yup.string(),
    phone: Yup.number().positive(),

    birth: Yup.date(),
    sex: Yup.string(),
    nationality: Yup.string(),
    placeOfBirth: Yup.string(),

    hasDeficiency: Yup.boolean(),
    deficiency: Yup.string(),

    address: Yup.object().shape({
      address: Yup.string(),
      number: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      cep: Yup.number().positive(),
      referencePoint: Yup.string(),
    }),

    identity: Yup.number().positive(),
    cpf: Yup.string(),
    Department: Yup.string(),
    emission: Yup.date(),

    diagnostic: Yup.string(),
    visualAcuity: Yup.string(),
    cid10: Yup.string(),

    hasARelativeAttended: Yup.boolean(),
    relativeAttended: Yup.string(),

    transport: Yup.string(),

    isInGovernmentProgram: Yup.boolean(),
    governmentProgram: Yup.string(),
    governmentProgramValue: Yup.number().positive(),
    beneficiary: Yup.string(),
    nisNumber: Yup.number().positive(),

    schooling: Yup.object().shape({
      grade: Yup.string(),
      turn: Yup.string(),
      hasVinculeHelioGoes: Yup.boolean(),
      transportToInstitute: Yup.string(),
      hasMemberMatriculatedOrWillMatriculate: Yup.boolean(),
    }),

    property: Yup.object().shape({
      type_property: Yup.string(),
      physical_structure: Yup.string(),
      numberOfRooms: Yup.number().positive(),
      numberOfBathrooms: Yup.number().positive(),
      energyElectric: Yup.string(),
      waterSupply: Yup.string(),
      sanitarySewage: Yup.boolean(),
      garbageCollection: Yup.boolean(),
      statusProperty: Yup.string(),
      monthlyRent: Yup.number().positive(),
      monthlyFinancing: Yup.number().positive(),
      isSharedWithOtherFamily: Yup.boolean(),
      houseProvidedBy: Yup.string(),
    }),
  });
  if (!(await schema.isValid(request.body, { strict: true }))) {
    return response.status(400).json({ error: 'Validation fails!' });
  }

  return next();
}

module.exports = UpdateAssistedValidation;
