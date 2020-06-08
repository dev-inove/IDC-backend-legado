/* eslint-disable no-underscore-dangle */
const Yup = require('yup')
const MemberFamily = require('../models/MemberFamily')
const AssistedUser = require('../models/AssistedUser')

class UserController {
    async update(req, res, next) {
        const schema = Yup.object().shape({
            CPFAssisted: Yup.string().required(),
            CPFMemberFamily: Yup.string().required(),
            isResponsible: Yup.boolean().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ message: 'validations fails' })
        }

        const { CPFAssisted, CPFMemberFamily, isResponsible } = req.body

        const assisted = await AssistedUser.findOne({ cpf: CPFAssisted })
        const member = await MemberFamily.findOne({ cpf: CPFMemberFamily })

        if (!assisted || !member) {
            return res
                .status(400)
                .json({ message: 'Check the datas and try again' })
        }
        if (member.idAssisted.includes(assisted.id)) {
            return res.status(400).json({
                message: 'Assised alredy is includes on Member Family',
            })
        }

        if (isResponsible) {
            if (
                assisted.id_Responsible !== null &&
                assisted.id_Responsible !== undefined
            ) {
                return res.status(401).json({
                    message:
                        'The user alredy has a Responsible, try angain uncheck the option of responsible',
                })
            }
            member.idAssisted.push(assisted.id)
            assisted.id_Responsible = member.id
            await member.save()
            await assisted.save()
        } else {
            member.idAssisted.push(assisted.id)
            await member.save()
        }

        return res.status(200).json({ message: 'User associate with success' })
    }
}

module.exports = new UserController()
