class AssociateAssistedWithMemberFamilyService {
  async execute({ assisted, member, isResponsible }) {
    if (isResponsible) {
      member.isResponsible = true;
      member.idAssisted.push(assisted.id);
      assisted.id_Responsible = member.id;
      await member.save();
      await assisted.save();
    } else {
      member.idAssisted.push(assisted.id);
      await member.save();
    }
  }
}

module.exports = AssociateAssistedWithMemberFamilyService;
