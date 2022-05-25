const Assisted = require('@models/AssistedUser');
const MemberFamily = require('@models/MemberFamily');
const StoreAssistedService = require('@service/StoreAssistedService');
const IndexAssistedService = require('@service/IndexAssistedService');
const ShowAssistedService = require('@service/ShowAssistedService');
const UpdateAssistedService = require('@service/UpdateAssistedService');
const DestroyAssistedService = require('@service/DestroyAssistedService');
const e = require('cors');
class AssistedController {
  async store(request, response) {
    try {
      const assisted = new Assisted(request.body);

      const storeAssistedService = new StoreAssistedService(request.body);

      const response = await storeAssistedService.execute({
        assisted,
      });

      return response.status(200).json(assisted);
    } catch (error) {
      throw new Error(error);
    }
  }

  async index(request, response) {
    try {
      const assisted = await Assisted.find();

      const indexAssistedService = new IndexAssistedService(request.body);

      const assist = await indexAssistedService.execute({
        assisted,
      });
      return response.json(assisted);
    } catch (error) {}
  }

  async show(request, response) {
    try {
      const { type } = request.query;

      const { id } = request.params;

      const showAssistedService = new ShowAssistedService(request.body);

      const assisted = await showAssistedService.execute({
        type,
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

      const { type } = request.query;

      const updateAssistedService = new UpdateAssistedService(request.body);

      const assisted = updateAssistedService.execute({
        type,
        id,
      });

      if (assisted === null) {
        throw new Error('Usuário nao existe!');
      }
      assisted.set(request.body);
      await assisted.save();

      return res.json(assisted);
    } catch (error) {
      throw new Error(error);
    }
  }

  async destroy(request, response) {
    try {
      const { id } = request.params;

      const { type } = request.query;
      const { destroy_members } = request.query;

      const destroyAssistedService = new DestroyAssistedService(request.body);

      const assisted = await destroyAssistedService.execute({
        id,
        type,
        destroy_members,
      });

      if (assisted === null) {
        throw new Error('Usuário nao existe!');
      }

      if (destroy_members) {
        const members = await MemberFamily.find({
          idAssisted: assisted.id,
        });

        await members.forEach(member => {
          member.remove();
        });
      }
    } catch (error) {}

    return res.json({ success: 'Deletado com sucesso!' });
  }
}

module.exports = new AssistedController();
