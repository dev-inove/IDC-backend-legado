class UpdateAssistedService {
  async execute(rType, id) {
    const type = await rType.find();
    const assistedId = await id.get();

    if (!assistedId) {
      throw new Error('Verifique o id especificado');
    }
  }
}
module.exports = UpdateAssistedService;
