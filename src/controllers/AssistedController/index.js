const Assisted = require('@models/AssistedUser');
const MemberFamily = require('@models/MemberFamily');
const ReturnByType = require('@service/ReturnAllAssistedByTypeService');
const ReturnByTypeAndEdit = require('@service/ReturnAssistedByTypeService');
const ReturnByTypeAndDelete = require('@service/ReturnAssistedByTypeAndDeleteService');

class AssistedController {
  async store(req, res) {
    try {
      const assisted = await Assisted.create(req.body);
      return res.json(assisted);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async index(req, res) {
    const assisted = await Assisted.find();

    return res.json(assisted);
  }

  async show(req, res) {
    const { type } = req.query;

    const assisted = await ReturnByType.exec(type, req.params.id);

    if (assisted === null) {
      return res.status(400).json({ message: "user don't exists!" });
    }

    return res.status(200).json({ assisted });
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not received' });
    }

    const { type } = req.query;

    const assisted = await ReturnByTypeAndEdit.exec(type, req.params.id);

    if (assisted === null) {
      return res.status(400).json({ message: "user don't exists!" });
    }
    try {
      assisted.set(req.body);
      await assisted.save();

      return res.json(assisted);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not received' });
    }

    const { type } = req.query;
    const { destroy_members } = req.query;

    const assisted = await ReturnByTypeAndDelete.exec(type, req.params.id);

    if (assisted === null) {
      return res.status(400).json({ message: "user don't exists!" });
    }

    if (destroy_members) {
      const members = await MemberFamily.find({
        idAssisted: assisted.id,
      });

      await members.forEach(member => {
        member.remove();
      });
    }

    return res.json({ success: 'Successfully deleted' });
  }
}

module.exports = new AssistedController();
