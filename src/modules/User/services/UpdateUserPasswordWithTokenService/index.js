const { verify } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('@modules/User/models/User');
const forgotTokenConfig = require('@config/ForgotPassConfig');

class UpdateUserPasswordWithTokenService {
  async execute({ token, newPassword, confirmNewPassword }) {
    if (!token) {
      throw new Error('O token deve ser informado!');
    }

    if (!newPassword || !confirmNewPassword) {
      throw new Error('A senha e a confirmação de senha devem ser informadas!');
    }

    const { sub } = verify(token, forgotTokenConfig.jwt.secret);

    const userFinded = await User.findOne({ _id: sub });

    if (!userFinded) throw new Error('Usuário não encontrado!');

    if (
      !!newPassword &&
      !!confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      const newPasswordHash = await bcrypt.hash(newPassword, 9);

      await User.updateOne(
        { _id: sub },

        {
          password_hash: newPasswordHash,
        },
      );
    } else throw new Error('A confirmação de senha falhou!');
  }
}

module.exports = UpdateUserPasswordWithTokenService;
