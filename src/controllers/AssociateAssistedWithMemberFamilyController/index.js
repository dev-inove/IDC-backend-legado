const MemberFamily = require('@models/MemberFamily');
const AssistedUser = require('@models/AssistedUser');

// Esse controller é usado apenas quando quero fazer a associação rápida
// entre asssitido e membro da familia
class AssociateAssistedWithMemberFamilyController {
  async update(req, res) {
    const { CPFAssisted, CPFMemberFamily, isResponsible } = req.body;

    const assisted = await AssistedUser.findOne({ cpf: CPFAssisted });
    const member = await MemberFamily.findOne({ cpf: CPFMemberFamily });

    if (!assisted || !member) {
      return res.status(400).json({ message: 'Check the datas and try again' });
    }
    if (member.idAssisted.includes(assisted.id)) {
      return res.status(400).json({
        message: 'Assised alredy is includes on Member Family',
      });
    }

    if (isResponsible) {
      if (
        assisted.id_Responsible !== null &&
        assisted.id_Responsible !== undefined
      ) {
        return res.status(401).json({
          message:
            'The user alredy has a Responsible, try angain uncheck the option of responsible',
        });
      }
      member.isResponsible = true;
      member.idAssisted.push(assisted.id);
      assisted.id_Responsible = member.id;
      await member.save();
      await assisted.save();
    } else {
      member.idAssisted.push(assisted.id);
      await member.save();
    }

    return res.status(200).json({ message: 'User associate with success' });
  }
}

module.exports = new AssociateAssistedWithMemberFamilyController();
