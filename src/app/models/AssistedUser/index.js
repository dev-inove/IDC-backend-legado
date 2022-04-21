const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AddressSchema = require('@models/Address');

const AssistedUserSchema = new mongoose.Schema(
  {
    id_Responsible: {
      type: mongoose.Types.ObjectId,
      ref: 'MemberFamily',
    },
    fullName: {
      type: String,
      required: true,
    },
    socialName: {
      type: String,
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
      unique: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    Department: {
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

    hasDeficiency: {
      type: Boolean,
      required: true,
    },
    deficiency: {
      type: String,
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

    schooling: {
      grade: { type: String, required: true },
      turn: { type: String, required: true },

      hasVinculeHelioGoes: { type: Boolean, required: true },
      transportToInstitute: { type: String, required: true },
      hasMemberMatriculatedOrWillMatriculate: {
        type: Boolean,
        required: true,
      },
    },

    property: {
      type_property: { type: String, required: true },
      physical_structure: { type: String, required: true },
      numberOfRooms: { type: Number, required: true },
      numberOfBathrooms: { type: Number, required: true },
      energyElectric: { type: String, required: true },
      waterSupply: { type: String, required: true },
      sanitarySewage: { type: Boolean, required: true },
      garbageCollection: { type: Boolean, required: true },
      statusProperty: { type: String, required: true },
      monthlyRent: { type: Number },
      monthlyFinancing: { type: Number },
      isSharedWithOtherFamily: { type: Boolean, required: true },
      houseProvidedBy: { type: String, required: true },
    },
  },

  {
    timestamps: true,
  },
);

AssistedUserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('AssistedUser', AssistedUserSchema);
