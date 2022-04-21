const { Router } = require('express');
const passport = require('passport');

const AssistedController = require('@controllers/AssistedController');
const MemberFamilyController = require('@controllers/MemberFamilyController');
const UserController = require('@controllers/UserController');
const SessionController = require('@controllers/SessionController');
const AssociateAssistedWithMemberController = require('@controllers/AssociateAssistedWithMemberFamilyController');
const SchemaPassport = require('./app/middlewares/Auth');

const routes = new Router();

routes.post('/user', UserController.store);
routes.get('/user/:email', UserController.show);
routes.get('/user/', UserController.index);
routes.post('/session', SessionController.store);

passport.use(SchemaPassport);
routes.use(passport.authenticate('jwt', { session: false }));

routes.put('/user/', UserController.update);

routes.post('/assisted', AssistedController.store);
routes.get('/assisted', AssistedController.index);
// use ?type=[TYPE] after id as query param to set the type of search
routes.get('/assisted/:id', AssistedController.show);
routes.put('/assisted/update/:id', AssistedController.update);
routes.delete('/assisted/:id', AssistedController.destroy);

routes.post('/memberfamily', MemberFamilyController.store);
routes.get('/memberfamily/:idAssisted', MemberFamilyController.index);
routes.get('/memberfamily/search/:id', MemberFamilyController.show);
routes.put('/memberfamily/update/:id', MemberFamilyController.update);
routes.delete('/memberfamily/delete/:id', MemberFamilyController.destroy);

// Rota para associar um membro a um assistido
routes.put('/associate', AssociateAssistedWithMemberController.update);

module.exports = routes;
