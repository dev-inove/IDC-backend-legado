const FoorgotPasswordController = require('@controllers/FoorgotPasswordController');
const UpdateUserPasswordWithTokenController = require('@controllers/UpdateUserPasswordWithTokenController');
const { Router } = require('express');

const forgotPasswordRouter = Router();

forgotPasswordRouter.post('/', FoorgotPasswordController.store);
forgotPasswordRouter.post(
  '/updatepassword',
  UpdateUserPasswordWithTokenController.update,
);

module.exports = forgotPasswordRouter;
