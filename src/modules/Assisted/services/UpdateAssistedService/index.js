const AssistedUser = require('@modules/Assisted/models/AssistedUser');

class UpdateAssistedService {
    async execute({assistedId,body,res}) {
        await AssistedUser.updateOne({ _id: assistedId }, body);

        if (AssistedUser.matchedCount === 0) {
            res.status(442).json({ message: 'Assistido não encontrado' })
            return false;
        }
        return true;
    }
}
module.exports = UpdateAssistedService;
