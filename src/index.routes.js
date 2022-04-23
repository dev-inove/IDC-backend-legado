const UserAuthenticationController = require('@controllers/UserAuthenticationController');
const assistedRouter = require('@routes/assisted.routes');
const memberFamilyRouter = require('@routes/memberFamily.routes');
const userRouter = require('@routes/user.routes');
const { Router } = require('express');
const passport = require('passport');

const SchemaPassport = require('./middlewares/Auth');

const routes = new Router();

routes.post('/authentication', UserAuthenticationController.store);

passport.use(SchemaPassport);
routes.use(passport.authenticate('jwt', { session: true }));

routes.use(userRouter);
routes.use(assistedRouter);
routes.use(memberFamilyRouter);

module.exports = routes;
