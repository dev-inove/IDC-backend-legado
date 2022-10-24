const AssistedUser = require('@modules/Assisted/models/AssistedUser');

class UpdateAssistedService {
    async execute(request,res) {
        const { id } = request.params

        await AssistedUser.updateOne({ _id: id }, request.body);

        if (AssistedUser.matchedCount === 0) {
            res.status(442).json({ message: 'Assistido não encontrado' })
            return false;
        }
        return true;
    }
}
module.exports = UpdateAssistedService;
