const express = require('express');
const { buildUserController } = require('../controllers/userController');

function userRoutes(options = {}) {
  const router = express.Router();
  const controller = buildUserController(options);

  router.post('/register', controller.registerUser);

  return router;
}

module.exports = userRoutes;
