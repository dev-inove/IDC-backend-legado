const mongoose = require('mongoose');
const AddressSchema = require('./Address');

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
    type: AddressSchema,
    required: true,
  },
  phone: {
    type: Number,
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
