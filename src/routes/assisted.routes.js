const AssistedController = require('@controllers/AssistedController');
const AssociateAssistedWithMemberFamilyController = require('@controllers/AssociateAssistedWithMemberFamilyController');
const { Router } = require('express');

const assistedRouter = Router();

assistedRouter.post('/assisted', AssistedController.store);
assistedRouter.get('/assisted', AssistedController.index);
// use ?type=[TYPE] after id as query param to set the type of search
assistedRouter.get('/assisted/:id', AssistedController.show);
assistedRouter.put('/assisted/update/:id', AssistedController.update);
assistedRouter.delete('/assisted/:id', AssistedController.destroy);
// Rota para associar um membro a um assistido

assistedRouter.put(
  '/associate',
  AssociateAssistedWithMemberFamilyController.update,
);

module.exports = assistedRouter;
