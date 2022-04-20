const Assisted = require('../models/AssistedUser');

module.exports = {
  async exec(type, value) {
    if (type === 'email') {
      const assisted = await Assisted.findOneAndDelete({ email: value });
      return assisted;
    }
    if (type === 'nome') {
      const assisted = await Assisted.findOneAndDelete({
        fullName: { $nin: value.replace(/-/gi, ' ') || value },
      });
      return assisted;
    }
    if (type === 'cpf') {
      const assisted = await Assisted.findOneAndDelete({ cpf: value });
      return assisted;
    }

    return null;
  },
};
