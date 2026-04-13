const { createDashboardService } = require('../services/dashboardService');

function buildDashboardController(options = {}) {
  const dashboardService = options.dashboardService || createDashboardService();

  async function getDashboard(_req, res, next) {
    try {
      const dashboard = await dashboardService.getDashboard();

      return res.status(200).json({
        message: 'Dashboard fetched successfully.',
        data: dashboard
      });
    } catch (error) {
      return next(error);
    }
  }

  return { getDashboard };
}

module.exports = { buildDashboardController };
