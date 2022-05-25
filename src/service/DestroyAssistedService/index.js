class DestroyAssistedService {
  async execute(id, rType, destroy) {
    const assistedId = await id.find();
    const type = await rType.find();
    const destroy_members = await destroy.find();

    if (!id) {
      throw new Error('ID nao especificado');
    }
  }
}
module.exports = DestroyAssistedService;
