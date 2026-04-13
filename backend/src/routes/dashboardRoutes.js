const express = require('express');
const { buildDashboardController } = require('../controllers/dashboardController');

function dashboardRoutes(options = {}) {
  const router = express.Router();
  const controller = buildDashboardController(options);

  router.get('/', controller.getDashboard);

  return router;
}

module.exports = dashboardRoutes;
