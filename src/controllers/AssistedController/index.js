//renomeei esse service(o arquivo na outra pasta também) para CreateAssistedService
const StoreAssistedService = require('@service/StoreAssistedService');

//renomeei esse service(o arquivo na outra pasta também) para FindAllAssistedService
const IndexAssistedService = require('@service/IndexAssistedService');

//renomeei esse service(o arquivo na outra pasta também) para FindAssistedByIdService
const ShowAssistedService = require('@service/ShowAssistedService');

const UpdateAssistedService = require('@service/UpdateAssistedService');

const DestroyAssistedService = require('@service/DestroyAssistedService');
class AssistedController {
  async store(request, response) {
    try {
      const storeAssistedService = new StoreAssistedService();

      //essa linha 12 a variavel não pode ser chamada de response, renomeia ela pra assistedCreated
      const response = await storeAssistedService.execute(request.body);

      return response.status(200).json(assisted);
    } catch (error) {
      // ao invés de lançar outra excessão que ta sendo tratada pegue a mensagem e retorne um response 400 com essa mensagem. Faça isso em todos endpoint
      throw new Error(error);
    }
  }

  async index(request, response) {
    try {
      const indexAssistedService = new IndexAssistedService();

      //tu não precisa mandar nada nesse metodo para retornar todos os assistidos, remova esse request.body dai
      const assisted = await indexAssistedService.execute(request.body);

      //falta o status da response
      return response.json(assisted);
      // pegue a mensagem e retorne um response 400 com essa mensagem. Faça isso em todos endpoint
    } catch (error) {}
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const showAssistedService = new ShowAssistedService(request.body);

      const assisted = await showAssistedService.execute({
        id,
      });
      //troque essa verificação de assisted === null para !!assisted
      if (assisted === null) {
        //remova esse lançamento de erro e retorne um response 404 informando que o assistido não foi encontrado
        throw new Error('Usuário não existe!');
      }
      return response.status(200).json({ assisted });
      //renomeie esse "e" pra error ou err e retorne a mensagem desse erro em um response 400
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

      // a classe está sendo usada e não a instância dela, troque UpdateAssistedService.execute para updateAssistedService.execute
      // renomeei para assistedUpdated essa variável
      const assisted = await UpdateAssistedService.execute({
        assistedId: id,
        assisteUpdateData: request.body,
      });

      //falta o status 201 nesse response
      return response.json(assisted);
      // pegue a mensagem e retorne um response 400 com essa mensagem. Faça isso em todos endpoint
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
        //remova esse lançamento de erro e retorne um response 404 informando que o assistido não foi encontrado
        throw new Error('Assistido nao encontrado');
      }
      //apague esse const assisted = e deixe só a execução do service com await
      const assisted = await destroyAssistedService.execute({
        id,
        destroy_members,
      });
      // pegue a mensagem e retorne um response 400 com essa mensagem. Faça isso em todos endpoint
    } catch (error) {}

    //coloque esse response dentro do try e adicione o status 201
    return response.json({ success: 'Deletado com sucesso!' });
  }
}

module.exports = new AssistedController();
