const User = require('@models/User');
const bcrypt = require('bcryptjs');

class UpdateUserService {
  async execute({
    _id,
    name,
    email,
    password,
    newPassword,
    confirmNewPassword,
  }) {
    const userFinded = await User.findOne({ _id });

    if (!userFinded) throw new Error('Usuário não encontrado!');

    if (password) {
      const passwordMatch = await bcrypt.compare(
        password,
        userFinded.password_hash,
      );

      if (passwordMatch) {
        if (
          !!newPassword &&
          !!confirmNewPassword &&
          newPassword === confirmNewPassword
        ) {
          const newPasswordHash = await bcrypt.hash(newPassword, 9);

          await User.updateOne(
            { _id },
            {
              name: name || userFinded.name,
              email: email || userFinded.email,
              password_hash: newPasswordHash,
            },
          );
        } else throw new Error('A confirmação de senha falhou!');
      } else throw new Error('A senha informada não corresponde!');
    }

    await User.updateOne(
      { _id },
      { name: name || userFinded.name, email: email || userFinded.email },
    );

    const userUpdate = await User.findOne({ _id }, { password_hash: 0 });

    return userUpdate;
  }
}

module.exports = UpdateUserService;
