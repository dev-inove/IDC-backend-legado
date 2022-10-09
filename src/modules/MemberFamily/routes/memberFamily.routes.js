const MemberFamilyController = require('@modules/MemberFamily/controllers/MemberFamilyController');
const { Router } = require('express');

const CreateMemberFamilyValidation = require('@modules/MemberFamily/middlewares/validations/CreateMemberFamilyValidation');
const ListMembersFamilyValidation = require('@modules/MemberFamily/middlewares/validations/ListMembersFamilyValidation');
const ShowMemberFamilyValidation = require('@modules/MemberFamily/middlewares/validations/ShowMemberFamilyValidation');
const UpdateMemberFamilyValidation = require('@modules/MemberFamily/middlewares/validations/UpdateMemberFamilyValidation');
const DestroyMemberFamilyValidation = require('@modules/MemberFamily/middlewares/validations/DestroyMemberFamilyValidation');
const SchemaPassport = require('@shared/middlewares/Auth');
const passport = require('passport');

const memberFamilyRouter = Router();

passport.use(SchemaPassport);
memberFamilyRouter.use(passport.authenticate('jwt', { session: false }));

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
