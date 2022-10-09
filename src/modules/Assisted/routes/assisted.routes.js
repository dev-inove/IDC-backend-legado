const AssistedController = require('@modules/Assisted/controllers/AssistedController');
const AssociateAssistedWithMemberFamilyController = require('@modules/Assisted/controllers/AssociateAssistedWithMemberFamilyController');
const { Router } = require('express');

const CreateAssistedValidation = require('@modules/Assisted/middlewares/validations/CreateAssistedValidation');
const ShowAssistedValidation = require('@modules/Assisted/middlewares/validations/ShowAssistedValidation');
const UpdateAssistedValidation = require('@modules/Assisted/middlewares/validations/UpdateAssistedValidation');
const DestroyAssistedValidation = require('@modules/Assisted/middlewares/validations/DestroyAssistedValidation');
const AssociateAssistedWithMemberFamilyValidation = require('@modules/Assisted/middlewares/validations/AssociateAssistedWithMemberFamilyValidation');
const SchemaPassport = require('@shared/middlewares/Auth');
const passport = require('passport');

const assistedRouter = Router();

passport.use(SchemaPassport);
assistedRouter.use(passport.authenticate('jwt', { session: false }));

assistedRouter.post('/', CreateAssistedValidation, AssistedController.store);
assistedRouter.get('/', AssistedController.index);
// use ?type=[TYPE] after id as query param to set the type of search
assistedRouter.get('/:id', ShowAssistedValidation, AssistedController.show);
assistedRouter.put(
  '/update/:id',
  UpdateAssistedValidation,
  AssistedController.update,
);
assistedRouter.delete(
  '/:id',
  DestroyAssistedValidation,
  AssistedController.destroy,
);

// Rota para associar um membro a um assistido
assistedRouter.put(
  '/associate',
  AssociateAssistedWithMemberFamilyValidation,
  AssociateAssistedWithMemberFamilyController.update,
);

module.exports = assistedRouter;
