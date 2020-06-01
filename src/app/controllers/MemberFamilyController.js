/* eslint-disable no-underscore-dangle */
const Yup = require('yup')
const MemberFamily = require('../models/MemberFamily')
const Assisted = require('../models/AssistedUser')

const ReturnByTypeVariable = require('../service/ReturnMemberFamilyByVariableType')
const ReturnByTypeVariableAndEdit = require('../service/ReturnMemberFamilyByVariableTypeAndUpdate')

// const ReturnByTypeAndEditAssisted = require('../service/ReturnAssistedByVariableTypeAndEdit')

class MemberFamilyController {
    async store(req, res, next) {
        const schema = Yup.object().shape({
            idAssisted: Yup.string().required(),
            kinship: Yup.string().required(),
            name: Yup.string().required(),
            rg: Yup.string().required(),
            cpf: Yup.string().required(),
            fones: Yup.array().of(Yup.number()),
            email: Yup.string().required(),
            renda: Yup.number(),
            isResponsible: Yup.boolean().required(),
            responsible: Yup.object().shape({
                rg: Yup.string(),
                responsibleValidator: Yup.string(),
                organization: Yup.string(),
                validity: Yup.string(),
            }),
            wasAttended: Yup.boolean(),
            doMedicalTreatment: Yup.boolean(),
            useContinuosMedication: Yup.boolean(),
            typeOfDisiase: Yup.string(),
        })
        const { idAssisted } = req.body

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ message: 'Invalid Object' })
        }
        const memberFamily = new MemberFamily(req.body)
        if (memberFamily.isResponsible === true) {
            const assistedUser = await Assisted.findById(idAssisted)
            if (
                assistedUser.id_Responsible !== undefined &&
                assistedUser.id_Responsible !== null
            ) {
                return res
                    .status(401)
                    .json('This Assisted already has a Responsible')
            }
            assistedUser.id_Responsible = memberFamily._id
            assistedUser.save()
        }

        memberFamily.save()

        return res.status(201).json(memberFamily)
    }

    async index(req, res, next) {
        const schema = Yup.object().shape({
            idAssisted: Yup.string().required(),
        })

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ message: 'This Id is invalid!' })
        }
        const { idAssisted } = req.params
        const members = await MemberFamily.find({
            idAssisted,
        }).populate('idAssisted', 'fullName')

        if (members.length === 0) {
            return res.status(400).json({
                message: "This user don't have members of family in the system",
            })
        }
        return res.status(200).json({ members })
    }

    async show(req, res, next) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ message: 'This Id is invalid! rapa' })
        }

        const { id } = req.params
        const { type } = req.query

        const member = await ReturnByTypeVariable.exec(type, id)

        if (member === undefined || member === null) {
            return res
                .status(400)
                .json({ message: 'Member of Family not found' })
        }
        return res.status(202).json({ member })
    }

    async update(req, res, next) {
        const schema = Yup.object().shape({
            idAssisted: Yup.string(),
            kinship: Yup.string().required(),
            name: Yup.string().required(),
            rg: Yup.string().required(),
            cpf: Yup.string().required(),
            fones: Yup.array().of(Yup.number()),
            email: Yup.string(),
            renda: Yup.number(),
            isResponsible: Yup.boolean().required(),
            responsible: Yup.object().shape({
                rg: Yup.string(),
                responsibleValidator: Yup.string(),
                organization: Yup.string(),
                validity: Yup.string(),
            }),
            wasAttended: Yup.boolean().required(),
            doMedicalTreatment: Yup.boolean().required(),
            useContinuosMedication: Yup.boolean().required(),
            typeOfDisiase: Yup.string().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ message: 'Invalid Object' })
        }
        const { id } = req.params
        const { type } = req.query

        const isResponsibleBody = req.body.isResponsible

        const member = await ReturnByTypeVariableAndEdit.exec(type, id)
        const { idAssisted } = member

        const assistedUser = await Assisted.findById({ _id: idAssisted })
        if (member.isResponsible === true && isResponsibleBody === false) {
            assistedUser.id_Responsible = null
            delete assistedUser.id_Responsible
            assistedUser.save()
        }
        if (member.isResponsible === false && isResponsibleBody === true) {
            console.log(assistedUser.id_Responsible)
            if (assistedUser.id_Responsible === undefined) {
                assistedUser.set('id_Responsible', member._id)
            } else if (assistedUser.id_Responsible === null) {
                assistedUser.set('id_Responsible', member._id)
            } else {
                return res
                    .status(401)
                    .json({ message: 'this user alredy has a Responsible' })
            }

            // assistedUser.set('id_Responsible', member._id)
            assistedUser.save()
        }
        member.set(req.body)
        member.save()
        return res.status(204).json({ member_updated: member })
    }

    async destroy(req, res, next) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ message: 'Invalid Id!' })
        }
        const { id } = req.params
        const { type } = req.query
        try {
            const member = await ReturnByTypeVariableAndEdit.exec(type, id)

            if (member.isResponsible) {
                const assisted = await Assisted.findById({
                    _id: member.idAssisted,
                })
                assisted.id_Responsible = null
                delete assisted.id_Responsible
                assisted.save()
            }
            member.remove()
            return res.status(204).json({ message: 'Member deleted!' })
        } catch (err) {
            return res
                .status(401)
                .json({ message: `Member not deleted! ${err}` })
        }
    }
}

module.exports = new MemberFamilyController()
