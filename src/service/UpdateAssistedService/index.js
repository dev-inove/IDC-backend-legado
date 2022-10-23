const AssistedUser = require('@models/AssistedUser');

class UpdateAssistedService {
    async execute(request) {

        const { id } = request.params


        await AssistedUser.updateOne({ _id: id }, request.body);

        if (AssistedUser.matchedCount === 0) {
            res.status(442).json({ message: 'Usuário nao encontrado' })
            return;
        }
        return true;
    }
}
module.exports = UpdateAssistedService;
