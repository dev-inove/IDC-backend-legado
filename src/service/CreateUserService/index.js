const bcrypt = require('bcryptjs');
const User = require('@models/User');

class CreateUserService {
  async execute({ name, email, password }) {
    const password_hash = await bcrypt.hash(password, 9);

    const user = await User.create({ name, email, password_hash });

    user.password_hash = null;

    return user;
  }
}

module.exports = CreateUserService;
