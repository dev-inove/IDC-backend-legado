const { Router } = require('express');
const AssistedController = require('./app/controllers/AssistedController');

const routes = new Router();

routes.post('/assisted', AssistedController.store);
routes.get('/assisted', AssistedController.index);
routes.get('/assisted/:id', AssistedController.show);
routes.delete('/assisted/:id', AssistedController.destroy);

module.exports = routes;
