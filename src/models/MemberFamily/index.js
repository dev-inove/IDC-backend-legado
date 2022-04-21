const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const MemberFamily = new Schema(
  {
    idAssisted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'AssistedUser',
        required: true,
      },
    ],
    kinship: { type: String, required: true },
    name: { type: String, required: true },
    rg: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    fones: [{ type: String }],
    email: { type: String, unique: true },
    renda: { type: Number },

    isResponsible: { type: Boolean, required: true },
    responsible: {
      rg: { type: String },
      responsibleValidator: { type: String },
      organization: { type: String },
      validity: { type: String },
    },

    wasAttended: { type: Boolean },
    doMedicalTreatment: { type: Boolean },
    useContinuosMedication: { type: Boolean },
    typeOfDisiase: { type: String },
  },
  {
    timestamps: true,
  },
);
MemberFamily.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('MemberFamily', MemberFamily);
