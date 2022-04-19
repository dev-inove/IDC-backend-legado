const Assisted = require('../models/AssistedUser');

module.exports = {
  async exec(type, value) {
    if (type === 'email') {
      const assisted = await Assisted.findOneAndDelete({ email: value });
      return assisted;
    }
    if (type === 'nome') {
      // console.log(value, value.replace(/-/gi, ' '))
      const assisted = await Assisted.findOneAndDelete({
        // regexp to change every - to ' '
        // $in just for the fullName has to be exact
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
