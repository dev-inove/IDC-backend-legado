const MemberFamily = require('@models/MemberFamily');

class ListMemberFamilyByidAssistedService {
  async execute({ idAssisted }) {
    const membersFamily = await MemberFamily.find({
      idAssisted,
    }).populate('idAssisted', 'fullName');

    if (membersFamily.length === 0) {
      throw new Error(
        'Esse assistido não possui menbros da família cadastrados no sistema.',
      );
    }

    return membersFamily;
  }
}

module.exports = ListMemberFamilyByidAssistedService;
