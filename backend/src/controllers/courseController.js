const { createCourseService } = require('../services/courseService');

function buildCourseController(options = {}) {
  const courseService = options.courseService || createCourseService();

  async function getCourses(_req, res, next) {
    try {
      const courses = await courseService.getCourses();

      return res.status(200).json({
        message: 'Courses fetched successfully.',
        data: courses
      });
    } catch (error) {
      return next(error);
    }
  }

  return { getCourses };
}

module.exports = { buildCourseController };
