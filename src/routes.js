const { Router } = require('express')
const AssistedController = require('./app/controllers/AssistedController')
const MemberFamilyController = require('./app/controllers/MemberFamilyController')

const routes = new Router()

routes.post('/assisted', AssistedController.store)
routes.get('/assisted', AssistedController.index)
// use ?type=[TYPE] after id as query param to set the type of search
routes.get('/assisted/:id', AssistedController.show)
routes.put('/assisted/:id', AssistedController.update)
routes.delete('/assisted/:id', AssistedController.destroy)

routes.post('/memberfamily', MemberFamilyController.store)
routes.get('/memberfamily/:idAssisted', MemberFamilyController.index)
routes.get('/memberfamily/search/:_id', MemberFamilyController.show)
routes.put('/memberfamily/update/:_id', MemberFamilyController.update)
routes.delete('/memberfamily/delete/:_id', MemberFamilyController.destroy)

module.exports = routes
