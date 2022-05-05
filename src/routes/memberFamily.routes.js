const MemberFamilyController = require('@controllers/MemberFamilyController');
const { Router } = require('express');

const CreateMemberFamilyValidation = require('@middlewares/validations/CreateMemberFamilyValidation');
const ListMembersFamilyValidation = require('@middlewares/validations/ListMembersFamilyValidation');
const ShowMemberFamilyValidation = require('@middlewares/validations/ShowMemberFamilyValidation');
const UpdateMemberFamilyValidation = require('@middlewares/validations/UpdateMemberFamilyValidation');
const DestroyMemberFamilyValidation = require('@middlewares/validations/DestroyMemberFamilyValidation');

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
memberFamilyRouter.get(
  '/search/:id',
  ShowMemberFamilyValidation,
  MemberFamilyController.show,
);
memberFamilyRouter.put(
  '/update/:id',
  UpdateMemberFamilyValidation,
  MemberFamilyController.update,
);
memberFamilyRouter.delete(
  '/delete/:id',
  DestroyMemberFamilyValidation,
  MemberFamilyController.destroy,
);

module.exports = memberFamilyRouter;
