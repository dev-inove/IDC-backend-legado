const { Router } = require('express');
const UserController = require('@controllers/UserController');

const UpdateUserValidation = require('@middlewares/validations/UpdateUserValidation');

const userRouter = Router();

userRouter.get('/:email', UserController.show);
userRouter.get('/', UserController.index);
userRouter.put('/', UpdateUserValidation, UserController.update);

module.exports = userRouter;
