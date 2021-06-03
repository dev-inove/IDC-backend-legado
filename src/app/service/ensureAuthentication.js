const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const config = require('../config/Auth')
const User = require('../models/User')

module.exports = {
    async exec(email, password) {
        const userVerified = await User.findOne({ email })

        if (userVerified === undefined) throw new Error('wrong email')

        const passwordMatch = await compare(
            password,
            userVerified.password_hash
        )

        if (!passwordMatch) throw new Error('wrong password')

        const { secret, expiresIn } = config.jwt

        const token = await sign({}, secret, {
            subject: userVerified.id,
            expiresIn,
        })

        return {
            user: {
                // _id: userVerified.id,
                name: userVerified.name,
                email: userVerified.email,
            },
            token,
        }
    },
}
