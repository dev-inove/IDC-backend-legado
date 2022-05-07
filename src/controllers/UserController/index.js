const bcrypt = require('bcryptjs');

const CreateUserService = require('@service/CreateUserService');
const ShowUserByEmail = require('@service/ShowUserByEmail');

const User = require('@models/User');

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const showUserByEmail = new ShowUserByEmail();
    const userExists = await showUserByEmail.execute({ email });

    if (userExists) {
      return res.status(400).json({ error: 'O email já está cadastrado!' });
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return res.status(201).json({ user });
  }

  async index(req, res) {
    const users = await User.find(
      {},
      { password_hash: 0, createdAt: 0, updatedAt: 0 },
    );
    if (!users) {
      return res.status(400).json({ error: "Users don't exists!" });
    }

    return res.status(200).json({ users });
  }

  async show(req, res) {
    const { email } = req.params;

    const showUserByEmail = new ShowUserByEmail();
    const user = await showUserByEmail.execute({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  }

  async update(req, res) {
    const { name, email, password, newPassword, confirmNewPassword } = req.body;

    const user = await User.findOne({ _id: req.user._id });

    if (name) user.name = name;
    if (email) user.email = email;
    if (bcrypt.compare(password, user.password_hash)) {
      if (
        newPassword !== null &&
        newPassword !== undefined &&
        confirmNewPassword !== null &&
        confirmNewPassword !== undefined &&
        confirmNewPassword === newPassword
      ) {
        user.password_hash = await bcrypt.hash(newPassword, 9);
      } else {
        return res.status(401).json({ message: 'Passwords differents' });
      }
      user.save();
      return res.status(200).json({ message: 'Data updated with sucess' });
    }
    return res
      .status(401)
      .json({ message: 'Data updated with Password wrong' });
  }
}

module.exports = new UserController();
