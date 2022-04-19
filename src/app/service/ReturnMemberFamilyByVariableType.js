// const Assisted = require('../models/AssistedUser')
const MemberFamily = require('../models/MemberFamily');

module.exports = {
  async exec(type, value) {
    if (type === 'email') {
      const assisted = await MemberFamily.find({ email: value });
      return assisted;
    }
    if (type === 'nome') {
      const assisted = await MemberFamily.find({
        // regexp to change every - to ' '
        // $in just for the fullName has to be exact
        name: { $nin: value.replace(/-/gi, ' ') || value },
      });
      return assisted;
    }
    if (type === 'cpf') {
      // console.log(value)
      const assisted = await MemberFamily.find({ cpf: value });
      return assisted;
    }

    return null;
  },
};
