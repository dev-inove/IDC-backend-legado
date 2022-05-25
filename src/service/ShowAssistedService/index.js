class ShowAssistedService {
  async execute(rType, id) {
    const type = await rType.find();

    const assistedId = await id.find();
  }
}
module.exports = ShowAssistedService;
