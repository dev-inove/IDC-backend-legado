const MemberFamily = require('@models/MemberFamily');

class ReturnMemberFamilyById {
  async execute({ memberFamilyId }) {
    const memberFamily = await MemberFamily.findById(memberFamilyId);

    return memberFamily;
  }
}

module.exports = ReturnMemberFamilyById;
