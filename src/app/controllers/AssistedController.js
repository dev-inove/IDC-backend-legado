const Yup = require('yup');
const Assisted = require('../models/AssistedUser');
const MemberFamily = require('../models/MemberFamily');

class AssistedController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id_Responsible: Yup.string(),
      fullName: Yup.string().required(),
      socialName: Yup.string(),
      maritalStatus: Yup.string().required(),
      email: Yup.string().required(),
      phone: Yup.number().positive().required(),

      birth: Yup.date().required(),
      sex: Yup.string().required(),
      nationality: Yup.string().required(),
      placeOfBirth: Yup.string().required(),

      hasDeficiency: Yup.boolean().required(),
      deficiency: Yup.string(),

      address: Yup.object()
        .shape({
          address: Yup.string().required(),
          number: Yup.string().required(),
          neighborhood: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().required(),
          cep: Yup.number().positive().required(),
          referencePoint: Yup.string().required(),
        })
        .required(),

      identity: Yup.number().positive().required(),
      cpf: Yup.string().required(),
      issuingBody: Yup.string().required(),
      emission: Yup.date().required(),

      diagnostic: Yup.string().required(),
      visualAcuity: Yup.string().required(),
      cid10: Yup.string().required(),

      hasARelativeAttended: Yup.boolean().required(),
      relativeAttended: Yup.string(),

      transport: Yup.string().required(),

      isInGovernmentProgram: Yup.boolean().required(),
      governmentProgram: Yup.string(),
      governmentProgramValue: Yup.number().positive(),
      beneficiary: Yup.string(),
      nisNumber: Yup.number().positive(),

      schooling: Yup.object()
        .shape({
          grade: Yup.string().required(),
          turn: Yup.string().required(),
          hasVinculeHelioGoes: Yup.boolean().required(),
          transportToInstitute: Yup.string().required(),
          hasMemberMatriculatedOrWillMatriculate: Yup.boolean().required(),
        })
        .required(),
      property: Yup.object()
        .shape({
          type_property: Yup.string().required(),
          physical_structure: Yup.string().required(),
          numberOfRooms: Yup.number().positive().required(),
          numberOfBathrooms: Yup.number().positive().required(),
          energyElectric: Yup.string().required(),
          waterSupply: Yup.string().required(),
          sanitarySewage: Yup.boolean().required(),
          garbageCollection: Yup.boolean().required(),
          statusProperty: Yup.string().required(),
          monthlyRent: Yup.number().positive(),
          monthlyFinancing: Yup.number().positive(),
          isSharedWithOtherFamily: Yup.boolean().required(),
          houseProvidedBy: Yup.string().required(),
        })
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const assisted = await Assisted.create(req.body);

    return res.json(assisted);
  }

  async index(req, res) {
    const assisted = await Assisted.find();

    return res.json(assisted);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const assisted = await Assisted.findById({ _id: req.params.id });

    return res.json(assisted);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id_Responsible: Yup.string(),
      fullName: Yup.string().required(),
      socialName: Yup.string(),
      maritalStatus: Yup.string().required(),
      email: Yup.string().required(),
      phone: Yup.number().positive().required(),

      birth: Yup.date().required(),
      sex: Yup.string().required(),
      nationality: Yup.string().required(),
      placeOfBirth: Yup.string().required(),

      hasDeficiency: Yup.boolean().required(),
      deficiency: Yup.string(),

      address: Yup.object()
        .shape({
          address: Yup.string().required(),
          number: Yup.string().required(),
          neighborhood: Yup.string().required(),
          city: Yup.string().required(),
          state: Yup.string().required(),
          cep: Yup.number().positive().required(),
          referencePoint: Yup.string().required(),
        })
        .required(),

      identity: Yup.number().positive().required(),
      cpf: Yup.string().required(),
      issuingBody: Yup.string().required(),
      emission: Yup.date().required(),

      diagnostic: Yup.string().required(),
      visualAcuity: Yup.string().required(),
      cid10: Yup.string().required(),

      hasARelativeAttended: Yup.boolean().required(),
      relativeAttended: Yup.string(),

      transport: Yup.string().required(),

      isInGovernmentProgram: Yup.boolean().required(),
      governmentProgram: Yup.string(),
      governmentProgramValue: Yup.number().positive(),
      beneficiary: Yup.string(),
      nisNumber: Yup.number().positive(),

      schooling: Yup.object()
        .shape({
          grade: Yup.string().required(),
          turn: Yup.string().required(),
          hasVinculeHelioGoes: Yup.boolean().required(),
          transportToInstitute: Yup.string().required(),
          hasMemberMatriculatedOrWillMatriculate: Yup.boolean().required(),
        })
        .required(),
      property: Yup.object()
        .shape({
          type_property: Yup.string().required(),
          physical_structure: Yup.string().required(),
          numberOfRooms: Yup.number().positive().required(),
          numberOfBathrooms: Yup.number().positive().required(),
          energyElectric: Yup.string().required(),
          waterSupply: Yup.string().required(),
          sanitarySewage: Yup.boolean().required(),
          garbageCollection: Yup.boolean().required(),
          statusProperty: Yup.string().required(),
          monthlyRent: Yup.number().positive(),
          monthlyFinancing: Yup.number().positive(),
          isSharedWithOtherFamily: Yup.boolean().required(),
          houseProvidedBy: Yup.string().required(),
        })
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not received' });
    }

    const assisted = await Assisted.findByIdAndUpdate({ _id: id });

    assisted.set(req.body);
    assisted.save();

    return res.json(assisted);
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const members = await MemberFamily.find({ idAssisted: req.params.id });

    await members.forEach((member) => {
      member.remove();
    });

    await Assisted.findByIdAndDelete({ _id: req.params.id });

    return res.json({ success: 'Successfully deleted' });
  }
}

module.exports = new AssistedController();
