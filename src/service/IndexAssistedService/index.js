class IndexAssistedService {
  async execute(assistedData) {
    const assisted = await assistedData.find();

    return assisted;
  }
}

module.exports = IndexAssistedService;
