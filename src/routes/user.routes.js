const { Router } = require('express');
const UserController = require('@controllers/UserController');

const passport = require('passport');

const UpdateUserValidation = require('@middlewares/validations/UpdateUserValidation');
const CreateUserValidation = require('@middlewares/validations/CreateUserValidation');
const SchemaPassport = require('@middlewares/Auth');
const UpdateUserPasswordValidation = require('@middlewares/validations/UpdateUserPasswordValidation');
const UpdateUserPasswordController = require('@controllers/UpdateUserPasswordController');

const userRouter = Router();

userRouter.post('/', CreateUserValidation, UserController.store);

passport.use(SchemaPassport);
userRouter.use(passport.authenticate('jwt', { session: false }));

userRouter.get('/:email', UserController.show);
userRouter.get('/', UserController.index);
userRouter.put('/', UpdateUserValidation, UserController.update);
userRouter.patch(
  '/',
  UpdateUserPasswordValidation,
  UpdateUserPasswordController.update,
);

module.exports = userRouter;
