const UserController = require('@controllers/UserController');
const { Router } = require('express');

const userRouter = Router();

userRouter.post('/user', UserController.store);
userRouter.get('/user/:email', UserController.show);
userRouter.get('/user/', UserController.index);
userRouter.put('/user/', UserController.update);

module.exports = userRouter;
