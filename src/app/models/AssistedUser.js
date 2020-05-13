const mongoose = require('mongoose');

const AssistedUserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  socialName: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  hasDeficiency: {
    type: Boolean,
    required: true,
  },
  deficiency: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  referencePoint: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  issuingBody: {
    type: String,
    required: true,
  },
  emission: {
    type: Date,
    required: true,
  },
  diagnostic: {
    type: String,
    required: true,
  },
  visualAcuity: {
    type: String,
    required: true,
  },
  cid10: {
    type: String,
    required: true,
  },
  hasARelativeAttended: {
    type: Boolean,
    required: true,
  },
  relativeAttended: {
    type: String,
  },
  transport: {
    type: String,
    required: true,
  },
  isInGovernmentProgram: {
    type: Boolean,
    required: true,
  },
  governmentProgramName: {
    type: String,
  },
  governmentProgramValue: {
    type: Number,
  },
  beneficiary: {
    type: String,
  },
  nisNumber: {
    type: Number,
  },
});

module.exports = mongoose.model('AssistedUser', AssistedUserSchema);
