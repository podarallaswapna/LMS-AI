const express = require('express');
const { buildCourseController } = require('../controllers/courseController');

function courseRoutes(options = {}) {
  const router = express.Router();
  const controller = buildCourseController(options);

  router.get('/', controller.getCourses);

  return router;
}

module.exports = courseRoutes;
