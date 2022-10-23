const AssistedController = require('@controllers/AssistedController');
const AssociateAssistedWithMemberFamilyController = require('@controllers/AssociateAssistedWithMemberFamilyController');
const { Router } = require('express');

const CreateAssistedValidation = require('@middlewares/validations/CreateAssistedValidation');
const ShowAssistedValidation = require('@middlewares/validations/ShowAssistedValidation');
const UpdateAssistedValidation = require('@middlewares/validations/UpdateAssistedValidation');
const DestroyAssistedValidation = require('@middlewares/validations/DestroyAssistedValidation');
const AssociateAssistedWithMemberFamilyValidation = require('@middlewares/validations/AssociateAssistedWithMemberFamilyValidation');
const SchemaPassport = require('@middlewares/Auth');
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
