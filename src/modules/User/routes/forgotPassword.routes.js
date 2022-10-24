const ForgotPasswordController = require('@modules/User/controllers/ForgotPasswordController');
const UpdateUserPasswordWithTokenController = require('@modules/User/controllers/UpdateUserPasswordWithTokenController');
const ForgotPasswordValidation = require('@modules/User/middlewares/ForgotPasswordValidation');
const UpdateUserPasswordWithTokenValidation = require('@modules/User/middlewares/UpdateUserPasswordWithTokenValidation');
const { Router } = require('express');

const forgotPasswordRouter = Router();

forgotPasswordRouter.post(
  '/',
  ForgotPasswordValidation,
  ForgotPasswordController.store,
);
forgotPasswordRouter.post(
  '/updatepassword',
  UpdateUserPasswordWithTokenValidation,
  UpdateUserPasswordWithTokenController.update,
);

module.exports = forgotPasswordRouter;
