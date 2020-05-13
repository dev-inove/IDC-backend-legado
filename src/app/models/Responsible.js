const mongoose = require('mongoose');

const { Schema } = mongoose;

const ParentSchema = new mongoose.Schema({
  assistedUser: {
    type: Schema.Types.ObjectId,
    ref: 'AssistedUser',
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  situation: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
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
  hasCadUnico: {
    type: Boolean,
    required: true,
  },
  cadUnico: {
    type: Number,
  },
  occupation: {
    type: String,
    required: true,
  },
  docProvingResponsability: {
    type: Number,
    required: true,
  },
  issuingBody: {
    type: String,
    required: true,
  },
  validity: {
    type: Date,
    required: Number,
  },
});

module.exports = mongoose.model('Parent', ParentSchema);
