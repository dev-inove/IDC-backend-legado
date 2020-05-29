const mongoose = require('mongoose')
const AddressSchema = require('./Address')

const AssistedUserSchema = new mongoose.Schema(
    {
        // Mai Info
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
        // Adress Info
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

        // Legal infos
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

        // Visual issue info
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

        // Deficiency Info
        hasDeficiency: {
            type: Boolean,
            required: true,
        },
        deficiency: {
            type: String,
        },

        // Government Infos
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

        // schooling info
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

        // Property Info
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

    //   Tipo de Imóvel, Estrutura Física,
    // Quantidade de Cômodos (exceto banheiro), Quantidade de Banheiro ou Sanitário,
    // Fornecimento de Energia Elétrica (Companhia distribuidora, Inexistente,Outro, favor
    // especificar), Abastecimento de Água (Companhia distribuidora, Poço Artesiano,
    // Inexistente, Outro favor especificar), Esgoto Sanitário(Existente, Inexiste), Coleta de lixo
    // (Existente, Inexiste), Existente, Inexiste(Existente, Inexiste), Status (Próprio, Alugado,
    // informar o valor/ mês R$, Financiamento R$, Compartilhado com outra família, Cedido
    // por).

    {
        timestamps: true,
    }
)

module.exports = mongoose.model('AssistedUser', AssistedUserSchema)
