const AssistedUser = require('@modules/Assisted/models/AssistedUser');
const MemberFamily = require('@modules/MemberFamily/models/MemberFamily');

class DestroyAssistedService {
    async execute({ assistedId, destroy_members }) {
        const assistedFinded = await AssistedUser.findByIdAndDelete(assistedId);

        if (destroy_members) {
            await MemberFamily.deleteMany({
                idAssisted: assistedFinded._id,
            });
        }

        return true;
    }
}
module.exports = DestroyAssistedService;