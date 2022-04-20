const Yup = require('yup');
const AuthLogin = require('../service/ensureAuthentication');

class SessionController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'invalid format' });
    }

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

module.exports = new SessionController();
