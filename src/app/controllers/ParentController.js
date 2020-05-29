const Yup = require('yup')
const Parent = require('../models/Parent')

class ParentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            assisted: Yup.string().required(),
            type: Yup.string().required(),
            situation: Yup.string().required(),

            fullName: Yup.string().required(),
            birth: Yup.date(),
            email: Yup.string(),
            phone: Yup.number().positive().required(),

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

            hasCadUnico: Yup.bool().required(),
            cadUnico: Yup.number(),

            occupation: Yup.string().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails!' })
        }

        const parent = await Parent.create(req.body)

        return res.json(parent)
    }

    async index(req, res) {
        const parents = await Parent.find()

        return res.json(parents)
    }

    async destroy(req, res) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: 'id not received' })
        }

        try {
            await Parent.findByIdAndDelete({ _id: id })
            return res.json({ success: 'Parent successful deleted' })
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Error on deleting responsible' })
        }
    }
}

module.exports = new ParentController()
