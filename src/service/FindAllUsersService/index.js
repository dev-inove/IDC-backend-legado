const User = require('@models/User');

class FindAllUsersService {
  async execute() {
    const users = await User.find(
      {},
      { password_hash: 0, createdAt: 0, updatedAt: 0 },
    );

    return users;
  }
}

module.exports = FindAllUsersService;
