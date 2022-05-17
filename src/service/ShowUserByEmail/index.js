const User = require('@models/User');

class ShowUserByEmail {
  async execute({ email }) {
    if (!email) throw new Error('O email deve ser informado!');

    const userExists = await User.findOne({ email }, { password_hash: 0 });

    if (!userExists) throw new Error('Usuário não encontrado!');

    return userExists;
  }
}

module.exports = ShowUserByEmail;