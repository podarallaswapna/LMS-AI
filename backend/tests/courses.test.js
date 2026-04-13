const request = require('supertest');
const { createApp } = require('../src/app');

describe('GET /api/courses', () => {
  it('returns course data from the service', async () => {
    const courseService = {
      getCourses: jest.fn().mockResolvedValue([
        {
          id: 1,
          category: 'MERN',
          courseName: 'Mongo DB',
          level: 'Database',
          description: 'Document database fundamentals.'
        },
        {
          id: 2,
          category: 'Front End',
          courseName: 'HTML',
          level: 'Beginner',
          description: 'Semantic page structure.'
        }
      ])
    };

    const app = createApp({
      corsOrigin: 'http://localhost:4200',
      courseService
    });

    const response = await request(app).get('/api/courses');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Courses fetched successfully.');
    expect(response.body.data).toHaveLength(2);
    expect(courseService.getCourses).toHaveBeenCalledTimes(1);
  });

  it('returns 500 when the course service throws', async () => {
    const courseService = {
      getCourses: jest.fn().mockRejectedValue(new Error('db failure'))
    };

    const app = createApp({
      corsOrigin: 'http://localhost:4200',
      courseService
    });

    const response = await request(app).get('/api/courses');

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Internal server error.');
  });
});
