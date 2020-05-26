const mongoose = require('mongoose');
// const AddressSchema = require('./Address');

const { Schema } = mongoose;

const MemberFamily = new Schema(
  {
    idAssisted: {
      type: Schema.Types.ObjectId,
      ref: 'AssistedUser',
      required: true,
    },
    kinship: { type: String, required: true },
    name: { type: String, required: true },
    rg: { type: String, required: true },
    cpf: { type: String, required: true },
    fones: [{ type: String }],
    email: { type: String, required: true },
    renda: { type: Number, required: true },
    isResponsable: { type: Boolean, required: true },
    responsable: {
      rg: { type: String },
      responsibleValidator: { type: String },
      organization: { type: String },
      validity: { type: String },
    },
    wasAttended: { type: Boolean, required: true },
    doMedicalTreatment: { type: Boolean, required: true },
    useContinuosMedication: { type: Boolean, required: true },
    typeOfDisiase: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Id, Nome, Grau de
// Parentesco com o candidato (a), RG, CPF, N° Telefone(s), E-mail, Renda, Se for
// responsável (Documento, Comprobatório da Responsabilidade, Órgão Responsável,
// Vigência), foi atendido pela entidade(S,N), faz tratamento médico (S, N), usa medicamento
// contínuo(S, N), Tipo de doença.
module.exports = mongoose.model('MemberFamily', MemberFamily);
