const { sign } = require('jsonwebtoken');

const ShowUserByEmail = require('@service/ShowUserByEmail');

const forgotTokenConfig = require('@config/ForgotPassConfig');

class ForgotPasswordConbtroller {
  async store(request, response) {
    try {
      const { email } = request.body;
      const showUserbyEmail = new ShowUserByEmail();

      const user = await showUserbyEmail.execute({ email });

      const { secret, expiresIn } = forgotTokenConfig.jwt;

      const token = await sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      return response.status(201).json({ token });
    } catch (err) {
      const errorMessage = err.message;

      return response.status(400).json({ error: errorMessage });
    }
  }
}

module.exports = new ForgotPasswordConbtroller();
