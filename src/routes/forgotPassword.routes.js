const FoorgotPasswordController = require('@controllers/ForgotPasswordController');
const UpdateUserPasswordWithTokenController = require('@controllers/UpdateUserPasswordWithTokenController');
const FoorgotPasswordValidation = require('@middlewares/validations/ForgotPasswordValidation');
const UpdateUserPasswordWithTokenValidation = require('@middlewares/validations/UpdateUserPasswordWithTokenValidation');
const { Router } = require('express');

const forgotPasswordRouter = Router();

forgotPasswordRouter.post(
  '/',
  FoorgotPasswordValidation,
  FoorgotPasswordController.store,
);
forgotPasswordRouter.post(
  '/updatepassword',
  UpdateUserPasswordWithTokenValidation,
  UpdateUserPasswordWithTokenController.update,
);

module.exports = forgotPasswordRouter;
