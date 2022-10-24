const User = require('@modules/User/models/User');

class UpdateUserService {
  async execute({ _id, name, email }) {
    const userFinded = await User.findOne({ _id });

    if (!userFinded) throw new Error('Usuário não encontrado!');

    await User.updateOne(
      { _id },
      { name: name || userFinded.name, email: email || userFinded.email },
    );

    const userUpdate = await User.findOne({ _id }, { password_hash: 0 });

    return userUpdate;
  }
}

module.exports = UpdateUserService;
