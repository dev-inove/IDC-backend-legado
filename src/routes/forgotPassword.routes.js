const ForgotPasswordController = require('@controllers/User/ForgotPasswordController');
const UpdateUserPasswordWithTokenController = require('@controllers/User/UpdateUserPasswordWithTokenController');
const ForgotPasswordValidation = require('@middlewares/validations/User/ForgotPasswordValidation');
const UpdateUserPasswordWithTokenValidation = require('@middlewares/validations/User/UpdateUserPasswordWithTokenValidation');
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
