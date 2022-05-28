//renomeei esse service(o arquivo na outra pasta também) para CreateAssistedService
const CreateAssistedService = require('@service/CreateAssistedService');

const FindAllAssistedService = require('@service/FindAllAssistedService');

const FindAssistedByIdService = require('@service/FindAssistedByIdService');

const UpdateAssistedService = require('@service/UpdateAssistedService');

const DestroyAssistedService = require('@service/DestroyAssistedService');
class AssistedController {
  async store(request, response) {
    try {
      const createAssistedService = new CreateAssistedService();

      const assistedCreated = await createAssistedService.execute(request.body);

      return response.status(200).json(assistedCreated);
    } catch (error) {

      return response.status(400).json({message:error});
    }
  }

  async index(request, response) {
    try {
      const findAllAssistedService = new FindAllAssistedService();

      const assisted = await findAllAssistedService.execute();

      return response.status(200).json(assisted);

    } catch (error) {
      return response.status(400).json({message:error});
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const findAssistedByIdService = new FindAssistedByIdService();

      const assisted = await findAssistedByIdService.execute({
        id,
      });
      if (!!assisted) {

        return response.status(404).json({message:'Assistido nao encontrado'});
      }
      return response.status(201).json({ assisted });

    } catch (error) {
      return response.status(400).json({message:error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const updateAssistedService = new UpdateAssistedService();
      const findAssistedByIdService = new FindAssistedByIdService();

      const haveAssisted = await findAssistedByIdService.execute(id);

      if (!!haveAssisted) {
        return response.status(404).json({ error: 'Assistido nâo encontrado!' });
      }

      const assistedUpdated = await updateAssistedService.execute({
        assistedId: id,
        assisteUpdateData: request.body,
      });

      return response.status(201).json(assistedUpdated);

    } catch (error) {
      return response.status(400).json({message:error});
    }
  }

  async destroy(request, response) {
    try {
      const { id } = request.params;

      const { destroy_members } = request.query;

      const destroyAssistedService = new DestroyAssistedService();
      const findAssistedByIdService = new FindAssistedByIdService();

      const haveAssisted = await findAssistedByIdService.execute(id);

      if (!!haveAssisted) {

        return response.status(404).json({message:'Assistido nao encontrado!'});
      }

      await destroyAssistedService.execute({
        id,
        destroy_members,
      });

      return response.status(201).json({ success: 'Deletado com sucesso!' });

    } catch (error) {
      return response.status(400).json({message:error});
    }

  }
}

module.exports = new AssistedController();
