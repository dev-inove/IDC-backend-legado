const { Router } = require('express');
const passport = require('passport');

const UserController = require('@controllers/User/UserController');
const UpdateUserPasswordController = require('@controllers/User/UpdateUserPasswordController');

const UpdateUserValidation = require('@middlewares/validations/User/UpdateUserValidation');
const CreateUserValidation = require('@middlewares/validations/User/CreateUserValidation');
const UpdateUserPasswordValidation = require('@middlewares/validations/User/UpdateUserPasswordValidation');
const ShowUserValidation = require('@middlewares/validations/User/ShowUserValidation');
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
