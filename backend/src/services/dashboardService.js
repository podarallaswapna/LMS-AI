const { pool } = require('../config/database');

function createDashboardService(customPool = pool) {
  return {
    async getDashboard() {
      const [courseTotals] = await customPool.execute(`
        SELECT
          COUNT(*) AS totalCourses,
          COUNT(DISTINCT category) AS totalCategories
        FROM courses
      `);

      const [registrationTotals] = await customPool.execute(`
        SELECT COUNT(*) AS totalRegistrations
        FROM course_registrations
      `);

      const [courseBreakdown] = await customPool.execute(`
        SELECT
          category,
          COUNT(*) AS totalCourses
        FROM courses
        GROUP BY category
        ORDER BY category ASC
      `);

      const [registrationBreakdown] = await customPool.execute(`
        SELECT
          course,
          COUNT(*) AS totalRegistrations
        FROM course_registrations
        GROUP BY course
        ORDER BY totalRegistrations DESC, course ASC
      `);


      // Since created_at does not exist, fetch recent by id DESC
      const [recentRegistrations] = await customPool.execute(`
        SELECT
          id,
          name,
          designation,
          course,
          location
        FROM course_registrations
        ORDER BY id DESC
       
      `);

      return {
        totalCourses: Number(courseTotals[0]?.totalCourses || 0),
        totalCategories: Number(courseTotals[0]?.totalCategories || 0),
        totalRegistrations: Number(registrationTotals[0]?.totalRegistrations || 0),
        courseBreakdown: courseBreakdown.map((item) => ({
          category: item.category,
          totalCourses: Number(item.totalCourses)
        })),
        registrationBreakdown: registrationBreakdown.map((item) => ({
          course: item.course,
          totalRegistrations: Number(item.totalRegistrations)
        })),
        recentRegistrations
      };
    }
  };
}

module.exports = { createDashboardService };
