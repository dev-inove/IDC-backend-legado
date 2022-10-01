const User = require('@models/User');
const bcrypt = require('bcryptjs');

class ChangeUserPasswordService {
  async execute({ _id, newPassword, confirmNewPassword }) {
    const userFinded = await User.findOne({ _id });

    if (!userFinded) throw new Error('Usuário não encontrado!');

    if (
      !!newPassword &&
      !!confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      const newPasswordHash = await bcrypt.hash(newPassword, 9);

      await User.updateOne(
        { _id },

        {
          password_hash: newPasswordHash,
        },
      );
    } else throw new Error('A confirmação de senha falhou!');
  }
}

module.exports = ChangeUserPasswordService;
