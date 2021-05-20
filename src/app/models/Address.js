const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    number: {
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
    referencePoint: {
        type: String,
        required: true,
    },
})

module.exports = AddressSchema
