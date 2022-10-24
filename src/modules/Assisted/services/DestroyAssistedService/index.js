const AssistedUser = require('@modules/Assisted/models/AssistedUser');
const MemberFamily = require('@modules/MemberFamily/models/MemberFamily');

class DestroyAssistedService {
    async execute({ assistedId, destroy_members }) {
        const assistedFinded = await AssistedUser.findOneAndDelete(assistedId);

        if (destroy_members) {
            await MemberFamily.findOneAndDelete({
                idAssisted: assistedFinded._id,
            });
        }

        return true;
    }
}
module.exports = DestroyAssistedService;