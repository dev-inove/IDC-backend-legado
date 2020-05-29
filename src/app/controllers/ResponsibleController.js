// const Yup = require('yup')
// const Responsible = require('../models/Responsible')

// class ResponsibleController {
//     // async store(req, res) {
//         const schema = Yup.object().shape({
//             assisted: Yup.string().required(),
//             relashionship: Yup.string().required(),
//             situation: Yup.string().required(),

//             fullName: Yup.string().required(),
//             birth: Yup.date().required(),
//             email: Yup.string().required(),
//             phone: Yup.number().positive().required(),

//             address: Yup.object()
//                 .shape({
//                     address: Yup.string().required(),
//                     number: Yup.string().required(),
//                     neighborhood: Yup.string().required(),
//                     city: Yup.string().required(),
//                     state: Yup.string().required(),
//                     cep: Yup.number().positive().required(),
//                     referencePoint: Yup.string().required(),
//                 })
//                 .required(),

//             identity: Yup.number().positive().required(),
//             cpf: Yup.string().required(),

//             hasCadUnico: Yup.bool().required(),
//             cadUnico: Yup.number(),

//             occupation: Yup.string().required(),
//             docProvingResponsability: Yup.number().positive().required(),
//             issuingBody: Yup.string().required(),
//             validity: Yup.date().required(),
//         })

//         if (!(await schema.isValid(req.body))) {
//             return res.status(400).json({ error: 'Validation fails' })
//         }

//         const responsible = await Responsible.create(req.body)

//         return res.json(responsible)
//     }

//     async index(req, res) {
//         const responsibles = await Responsible.find()

//         return res.json(responsibles)
//     }

//     async destroy(req, res) {
//         const { id } = req.params

//         if (!id) {
//             return res.status(400).json({ error: 'id not received' })
//         }

//         try {
//             await Responsible.findByIdAndDelete({ _id: id })
//             return res.json({ success: 'Responsible successful deleted' })
//         } catch (error) {
//             return res
//                 .status(400)
//                 .json({ error: 'Error on deleting responsible' })
//         }
//     }
// }

// module.exports = new ResponsibleController()
