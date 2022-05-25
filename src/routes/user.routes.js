const { Router } = require('express');
const passport = require('passport');

const UserController = require('@controllers/UserController');
const UpdateUserPasswordController = require('@controllers/UpdateUserPasswordController');

const UpdateUserValidation = require('@middlewares/validations/UpdateUserValidation');
const CreateUserValidation = require('@middlewares/validations/CreateUserValidation');
const UpdateUserPasswordValidation = require('@middlewares/validations/UpdateUserPasswordValidation');
const ShowUserValidation = require('@middlewares/validations/ShowUserValidation');
const SchemaPassport = require('@middlewares/Auth');

const userRouter = Router();

userRouter.post('/', CreateUserValidation, UserController.store);

passport.use(SchemaPassport);
userRouter.use(passport.authenticate('jwt', { session: false }));

userRouter.get('/:email', ShowUserValidation, UserController.show);
userRouter.get('/', UserController.index);
userRouter.put('/', UpdateUserValidation, UserController.update);
userRouter.patch(
  '/',
  UpdateUserPasswordValidation,
  UpdateUserPasswordController.update,
);

module.exports = userRouter;
