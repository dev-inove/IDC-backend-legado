const UserAuthenticationController = require('@controllers/User/UserAuthenticationController');
const assistedRouter = require('@routes/assisted.routes');
const memberFamilyRouter = require('@routes/memberFamily.routes');
const userRouter = require('@routes/user.routes');
const { Router } = require('express');

const AuthenticationValidation = require('@middlewares/validations/User/AuthenticationValidation');
const forgotPasswordRouter = require('@routes/forgotPassword.routes');

const routes = new Router();

routes.post(
  '/authentication',
  AuthenticationValidation,
  UserAuthenticationController.store,
);

routes.use('/user', userRouter);
routes.use('/assisted', assistedRouter);
routes.use('/memberfamily', memberFamilyRouter);
routes.use('/forgotpassword', forgotPasswordRouter);

module.exports = routes;
