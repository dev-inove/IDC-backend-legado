const FoorgotPasswordController = require('@controllers/FoorgotPasswordController');
const { Router } = require('express');

const forgotPasswordRouter = Router();

forgotPasswordRouter.post('/', FoorgotPasswordController.store);

module.exports = forgotPasswordRouter;
