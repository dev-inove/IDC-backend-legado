const FoorgotPasswordController = require('@controllers/FoorgotPasswordController');
const UpdateUserPasswordWithTokenController = require('@controllers/UpdateUserPasswordWithTokenController');
const FoorgotPasswordValidation = require('@middlewares/validations/FoorgotPasswordValidation');
const { Router } = require('express');

const forgotPasswordRouter = Router();

forgotPasswordRouter.post(
  '/',
  FoorgotPasswordValidation,
  FoorgotPasswordController.store,
);
forgotPasswordRouter.post(
  '/updatepassword',
  UpdateUserPasswordWithTokenController.update,
);

module.exports = forgotPasswordRouter;
