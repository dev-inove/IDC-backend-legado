const CreateAssistedService = require('@modules/Assisted/services/CreateAssistedService');
const FindAllAssistedService = require('@modules/Assisted/services/FindAllAssistedService');
const FindAssistedByIdService = require('@modules/Assisted/services/FindAssistedByIdService');
const UpdateAssistedService = require('@modules/Assisted/services/UpdateAssistedService');
const DestroyAssistedService = require('@modules/Assisted/services/DestroyAssistedService');
class AssistedController {
    async store(request, response) {
        try {
            const createAssistedService = new CreateAssistedService();

            const assistedCreated = await createAssistedService.execute(request.body);

            return response.status(200).json(assistedCreated);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async index(request, response) {
        try {
            const findAllAssistedService = new FindAllAssistedService();

            const assisteds = await findAllAssistedService.execute();

            return response.status(200).json({ assisteds });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;

            const findAssistedByIdService = new FindAssistedByIdService();

            const assisted = await findAssistedByIdService.execute({
                assistedId: id,
            });

            if (!assisted) {
                return response.status(404).json({ error: 'Assistido não encontrado' });
            }

            return response.status(201).json({ assisted });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;

            const updateAssistedService = new UpdateAssistedService();
            const findAssistedByIdService = new FindAssistedByIdService();

            const haveAssisted = await findAssistedByIdService.execute({
                assistedId: id,
            });

            if (!haveAssisted) {
                return response
                    .status(404)
                    .json({ error: 'Assistido nâo encontrado!' });
            }

            await updateAssistedService.execute(request,response);

            return response.status(201).json({ sucesso: "Atualizado com sucesso"});
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async destroy(request, response) {
        try {
            const { id } = request.params;

            const { destroy_members } = request.query;

            const destroyAssistedService = new DestroyAssistedService();
            const findAssistedByIdService = new FindAssistedByIdService();

            const haveAssisted = await findAssistedByIdService.execute({
                assistedId: id,
            });

            if (!haveAssisted) {
                return response
                    .status(404)
                    .json({ error: 'Assistido não encontrado!' });
            }

            await destroyAssistedService.execute({
                id,
                destroy_members,
            });

            return response.status(201).json({ success: 'Deletado com sucesso!' });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }
}

module.exports = new AssistedController();
