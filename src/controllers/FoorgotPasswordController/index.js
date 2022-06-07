const { sign } = require('jsonwebtoken');

const FindUserByEmailService = require('@service/FindUserByEmailService');

const forgotTokenConfig = require('@config/ForgotPassConfig');
const mailerTransport = require('@providers/mailerProvider');

class ForgotPasswordConbtroller {
  async store(request, response) {
    try {
      const { email } = request.body;
      const findUserByEmailService = new FindUserByEmailService();

      const user = await findUserByEmailService.execute({ email });

      const { secret, expiresIn } = forgotTokenConfig.jwt;

      const token = await sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      await mailerTransport.sendMail({
        to: email,
        from: 'brunoviniciusazevedolopes@alu.ufc.br',
        subject: 'Recuperação de senha!',
        template: 'forgotPassword',
        context: { token },
      });

      return response
        .status(201)
        .json({ message: 'email enviado com sucesso' });
    } catch (err) {
      const errorMessage = err.message;

      return response.status(400).json({ error: errorMessage });
    }
  }
}

module.exports = new ForgotPasswordConbtroller();
