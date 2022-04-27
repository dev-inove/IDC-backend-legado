const UserController = require('@controllers/UserController');
const { Router } = require('express');

const userRouter = Router();

userRouter.get('/:email', UserController.show);
userRouter.get('/', UserController.index);
userRouter.put('/', UserController.update);

module.exports = userRouter;
