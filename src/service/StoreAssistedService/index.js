class StoreAssistedService {
  async execute(assistedData) {
    const create = await Assisted.create(assistedData);

    return create;
  }
}
module.exports = StoreAssistedService;
