const { Router } = require('express');
const passport = require('passport');

const UserController = require('@modules/User/controllers/UserController');
const UpdateUserPasswordController = require('@modules/User/controllers/UpdateUserPasswordController');

const UpdateUserValidation = require('@modules/User/middlewares/UpdateUserValidation');
const CreateUserValidation = require('@modules/User/middlewares/CreateUserValidation');
const UpdateUserPasswordValidation = require('@modules/User/middlewares/UpdateUserPasswordValidation');
const ShowUserValidation = require('@modules/User/middlewares/ShowUserValidation');
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
