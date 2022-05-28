const StoreAssistedService = require('@service/StoreAssistedService');
const IndexAssistedService = require('@service/IndexAssistedService');
const ShowAssistedService = require('@service/ShowAssistedService');
const UpdateAssistedService = require('@service/UpdateAssistedService');
const DestroyAssistedService = require('@service/DestroyAssistedService');
class AssistedController {
  async store(request, response) {
    try {
      const storeAssistedService = new StoreAssistedService();

      const response = await storeAssistedService.execute(request.body);

      return response.status(200).json(assisted);
    } catch (error) {
      throw new Error(error);
    }
  }

  async index(request, response) {
    try {
      const indexAssistedService = new IndexAssistedService();

      const assisted = await indexAssistedService.execute(request.body);

      return response.json(assisted);
    } catch (error) {}
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const showAssistedService = new ShowAssistedService(request.body);

      const assisted = await showAssistedService.execute({
        id,
      });
      if (assisted === null) {
        throw new Error('Usuário não existe!');
      }
      return response.status(200).json({ assisted });
    } catch (e) {}
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const updateAssistedService = new UpdateAssistedService();
      const showAssistedService = new ShowAssistedService();

      const haveAssisted = await showAssistedService.execute(id);

      if (!!haveAssisted) {
        return response.status(404).json({ error: 'Assitido nâo encontrado!' });
      }

      const assisted = await UpdateAssistedService.execute({
        assistedId: id,
        assisteUpdateData: request.body,
      });

      return response.json(assisted);
    } catch (error) {
      throw new Error(error);
    }
  }

  async destroy(request, response) {
    try {
      const { id } = request.params;

      const { destroy_members } = request.query;

      const destroyAssistedService = new DestroyAssistedService();
      const showAssistedService = new ShowAssistedService();

      const haveAssisted = await showAssistedService.execute(id);

      if (!!haveAssisted) {
        throw new Error('Assistido nao encontrado');
      }

      const assisted = await destroyAssistedService.execute({
        id,
        destroy_members,
      });
    } catch (error) {}

    return response.json({ success: 'Deletado com sucesso!' });
  }
}

module.exports = new AssistedController();
