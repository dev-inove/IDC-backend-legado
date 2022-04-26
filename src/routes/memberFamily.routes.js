const MemberFamilyController = require('@controllers/MemberFamilyController');
const { Router } = require('express');

const memberFamilyRouter = Router();

memberFamilyRouter.post('/', MemberFamilyController.store);
memberFamilyRouter.get('/:idAssisted', MemberFamilyController.index);
memberFamilyRouter.get('/search/:id', MemberFamilyController.show);
memberFamilyRouter.put('/update/:id', MemberFamilyController.update);
memberFamilyRouter.delete('/delete/:id', MemberFamilyController.destroy);

module.exports = memberFamilyRouter;
