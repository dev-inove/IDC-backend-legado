const UserAuthenticationController = require('@modules/User/controllers/UserAuthenticationController');
const assistedRouter = require('@modules/Assisted/routes/assisted.routes');
const memberFamilyRouter = require('@modules/MemberFamily/routes/memberFamily.routes');
const userRouter = require('@modules/User/routes/user.routes');
const { Router } = require('express');

const AuthenticationValidation = require('@modules/User/middlewares/AuthenticationValidation');
const forgotPasswordRouter = require('@modules/User/routes/forgotPassword.routes');

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
