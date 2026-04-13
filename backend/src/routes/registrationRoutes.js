const express = require('express');
const { buildRegistrationController } = require('../controllers/registrationController');

function registrationRoutes(options = {}) {
  const router = express.Router();
  const controller = buildRegistrationController(options);

  router.post('/', controller.createRegistration);

  return router;
}

module.exports = registrationRoutes;
