const request = require('supertest');
const { createApp } = require('../src/app');

describe('GET /api/dashboard', () => {
  it('returns dashboard metrics from courses and registrations', async () => {
    const dashboardService = {
      getDashboard: jest.fn().mockResolvedValue({
        totalCourses: 14,
        totalCategories: 4,
        totalRegistrations: 8,
        courseBreakdown: [
          { category: 'MERN', totalCourses: 4 }
        ],
        registrationBreakdown: [
          { course: 'MERN', totalRegistrations: 3 }
        ],
        recentRegistrations: [
          {
            id: 1,
            name: 'Anita Sharma',
            designation: 'Student',
            course: 'MERN',
            location: 'Bengaluru',
            createdAt: '2026-04-09T00:00:00.000Z'
          }
        ]
      })
    };

    const app = createApp({
      corsOrigin: 'http://localhost:4200',
      dashboardService
    });

    const response = await request(app).get('/api/dashboard');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Dashboard fetched successfully.');
    expect(response.body.data.totalCourses).toBe(14);
    expect(response.body.data.totalRegistrations).toBe(8);
    expect(dashboardService.getDashboard).toHaveBeenCalledTimes(1);
  });

  it('returns 500 when dashboard service throws', async () => {
    const dashboardService = {
      getDashboard: jest.fn().mockRejectedValue(new Error('db failure'))
    };

    const app = createApp({
      corsOrigin: 'http://localhost:4200',
      dashboardService
    });

    const response = await request(app).get('/api/dashboard');

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Internal server error.');
  });
});
