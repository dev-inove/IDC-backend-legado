const Yup = require('yup')
const Assisted = require('../models/AssistedUser')

class AssistedController {
    async store(req, res) {
        const schema = Yup.object().shape({
            // Main Info
            fullName: Yup.string().required(),
            socialName: Yup.string(),
            maritalStatus: Yup.string().required(),
            email: Yup.string(),
            phone: Yup.number().positive().required(),
            birth: Yup.date().required(),
            sex: Yup.string().required(),
            nationality: Yup.string().required(),
            placeOfBirth: Yup.string().required(),

            // Deficiency
            hasDeficiency: Yup.boolean().required(),
            deficiency: Yup.string(),

            // Address Info
            address: Yup.object().shape({
                address: Yup.string(),
                number: Yup.string(),
                neighborhood: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                cep: Yup.number().positive(),
                referencePoint: Yup.string(),
            }),

            // Legal docs info
            identity: Yup.string(),
            cpf: Yup.string(),
            emissionDate: Yup.date(),
            documentEmitter: Yup.string(),

            // Visual issue info
            diagnostic: Yup.string(),
            visualAcuity: Yup.string(),
            cid10: Yup.string(),

            hasARelativeAttended: Yup.boolean(),
            relativeAttended: Yup.string(),

            transport: Yup.string(),

            // Government assistence
            isInGovernmentProgram: Yup.boolean(),
            governmentProgram: Yup.string(),
            governmentProgramValue: Yup.number().positive(),
            beneficiary: Yup.string(),
            nisNumber: Yup.number().positive(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails!' })
        }

        const assisted = await Assisted.create(req.body)

        return res.json(assisted)
    }

    // Get all assisteds
    async index(req, res) {
        const assisted = await Assisted.find()
        return res.json(assisted)
    }

    // Get assisted by ID
    async show(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails!' })
        }

        const assisted = await Assisted.findById({ _id: req.params.id })

        return res.json(assisted)
    }

    async update(req, res) {
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

            // Deficiency
            hasDeficiency: Yup.boolean(),
            deficiency: Yup.string(),

            // Address Info
            address: Yup.object().shape({
                address: Yup.string(),
                number: Yup.string(),
                neighborhood: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                cep: Yup.number().positive(),
                referencePoint: Yup.string(),
            }),

            // Legal docs info
            identity: Yup.string(),
            cpf: Yup.string(),
            emissionDate: Yup.date(),
            documentEmitter: Yup.string(),

            // Visual issue info
            diagnostic: Yup.string(),
            visualAcuity: Yup.string(),
            cid10: Yup.string(),

            hasARelativeAttended: Yup.boolean(),
            relativeAttended: Yup.string(),

            transport: Yup.string(),

            // Government assistence
            isInGovernmentProgram: Yup.boolean(),
            governmentProgram: Yup.string(),
            governmentProgramValue: Yup.number().positive(),
            beneficiary: Yup.string(),
            nisNumber: Yup.number().positive(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails!' })
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: 'Id not received' })
        }

        const assisted = await Assisted.findByIdAndUpdate({ _id: id })

        return res.json(assisted)
    }

    async destroy(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails!' })
        }

        await Assisted.findByIdAndDelete({ _id: req.params.id })

        return res.json({ success: 'Successfully deleted' })
    }
}

module.exports = new AssistedController()
