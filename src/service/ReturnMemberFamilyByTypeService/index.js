const MemberFamily = require('@models/MemberFamily');

module.exports = {
  async exec(type, value) {
    if (type === 'email') {
      const assisted = await MemberFamily.findOne({ email: value });
      return assisted;
    }
    if (type === 'nome') {
      const assisted = await MemberFamily.findOne({
        name: { $nin: value.replace(/-/gi, ' ') || value },
      });
      return assisted;
    }
    if (type === 'cpf') {
      const assisted = await MemberFamily.findOne({ cpf: value });
      return assisted;
    }

    return null;
  },
};
