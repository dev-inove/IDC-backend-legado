const { Router } = require('express')
const AssistedController = require('./app/controllers/AssistedController')
const ParentController = require('./app/controllers/ParentController')

const routes = new Router()

routes.post('/assisted', AssistedController.store)
routes.get('/assisted', AssistedController.index)
routes.get('/assisted/:id', AssistedController.show)
routes.put('/assisted/:id', AssistedController.update) // Normalmente usamos o post e put apontando para o mesmo metodo
routes.delete('/assisted/:id', AssistedController.destroy)

routes.post('/parent', ParentController.store)
routes.get('/parent', ParentController.index)
routes.delete('/parent/:id', ParentController.destroy)

module.exports = routes
