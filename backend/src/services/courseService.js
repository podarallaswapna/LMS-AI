const { pool } = require('../config/database');

function createCourseService(customPool = pool) {
  return {
    async getCourses() {
      const sql = `
        SELECT
          id,
          category,
          course_name AS courseName,
          level,
          description
        FROM courses
        ORDER BY category ASC, course_name ASC
      `;

      const [rows] = await customPool.execute(sql);
      return rows;
    }
  };
}

module.exports = { createCourseService };
