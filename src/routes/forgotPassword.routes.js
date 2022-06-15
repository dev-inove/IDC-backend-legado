const ForgotPasswordController = require('@controllers/ForgotPasswordController');
const UpdateUserPasswordWithTokenController = require('@controllers/UpdateUserPasswordWithTokenController');
const ForgotPasswordValidation = require('@middlewares/validations/ForgotPasswordValidation');
const UpdateUserPasswordWithTokenValidation = require('@middlewares/validations/UpdateUserPasswordWithTokenValidation');
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
