const AuthLogin = require('@service/User/UserAuthenticationService');

class UserAuthenticationController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthLogin.exec(email, password);
      delete user.password_hash;
      return res.json({ user, token });
    } catch (error) {
      return res.status(401).json({ message: `${error}` });
    }
  }
}

module.exports = new UserAuthenticationController();
