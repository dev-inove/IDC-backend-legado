const User = require('@modules/User/models/User');

class FindUserByEmailService {
  async execute({ email }) {
    if (!email) throw new Error('O email deve ser informado!');

    const userExists = await User.findOne({ email }, { password_hash: 0 });

    return userExists;
  }
}

module.exports = FindUserByEmailService;
