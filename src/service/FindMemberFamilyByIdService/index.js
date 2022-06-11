const MemberFamily = require('@models/MemberFamily');

class FindMemberFamilyByIdService {
  async execute({ memberFamilyId }) {
    const memberFamily = await MemberFamily.findById(memberFamilyId);

    return memberFamily;
  }
}

module.exports = FindMemberFamilyByIdService;
