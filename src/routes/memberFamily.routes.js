const MemberFamilyController = require('@controllers/MemberFamilyController');
const { Router } = require('express');

const CreateMemberFamilyValidation = require('@middlewares/validations/CreateMemberFamilyValidation');
const ListMembersFamilyValidation = require('@middlewares/validations/ListMembersFamilyValidation');

const memberFamilyRouter = Router();

memberFamilyRouter.post(
  '/',
  CreateMemberFamilyValidation,
  MemberFamilyController.store,
);
memberFamilyRouter.get(
  '/:idAssisted',
  ListMembersFamilyValidation,
  MemberFamilyController.index,
);
memberFamilyRouter.get('/search/:id', MemberFamilyController.show);
memberFamilyRouter.put('/update/:id', MemberFamilyController.update);
memberFamilyRouter.delete('/delete/:id', MemberFamilyController.destroy);

module.exports = memberFamilyRouter;
