const User = require('@models/User');

class ShowUserByEmail {
  async execute({ email }) {
    if (!email) throw new Error('email must be provided');

    const userExists = await User.findOne({ email }, { password_hash: 0 });

    return userExists;
  }
}

module.exports = ShowUserByEmail;
