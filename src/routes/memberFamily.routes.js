const MemberFamilyController = require('@controllers/MemberFamilyController');
const { Router } = require('express');

const memberFamilyRouter = Router();

memberFamilyRouter.post('/memberfamily', MemberFamilyController.store);
memberFamilyRouter.get(
  '/memberfamily/:idAssisted',
  MemberFamilyController.index,
);
memberFamilyRouter.get('/memberfamily/search/:id', MemberFamilyController.show);
memberFamilyRouter.put(
  '/memberfamily/update/:id',
  MemberFamilyController.update,
);
memberFamilyRouter.delete(
  '/memberfamily/delete/:id',
  MemberFamilyController.destroy,
);

module.exports = memberFamilyRouter;
