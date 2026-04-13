const request = require('supertest');
const { createApp } = require('../src/app');

describe('POST /api/registrations', () => {
  it('creates a registration when payload is valid', async () => {
    const registrationService = {
      createRegistration: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Anita Sharma',
        designation: 'Student',
        course: 'MERN',
        location: 'Bengaluru'
      })
    };

    const app = createApp({
      corsOrigin: 'http://localhost:4200',
      registrationService
    });

    const response = await request(app)
      .post('/api/registrations')
      .send({
        name: 'Anita Sharma',
        designation: 'Student',
        course: 'MERN',
        location: 'Bengaluru'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Registration created successfully.');
    expect(registrationService.createRegistration).toHaveBeenCalledWith({
      name: 'Anita Sharma',
      designation: 'Student',
      course: 'MERN',
      location: 'Bengaluru'
    });
  });

  it('returns validation errors for invalid payload', async () => {
    const registrationService = {
      createRegistration: jest.fn()
    };

    const app = createApp({
      corsOrigin: 'http://localhost:4200',
      registrationService
    });

    const response = await request(app)
      .post('/api/registrations')
      .send({
        name: '',
        designation: '',
        course: '',
        location: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Validation failed.');
    expect(response.body.errors).toEqual({
      name: 'Name is required.',
      designation: 'Designation is required.',
      course: 'Course is required.',
      location: 'Location is required.'
    });
    expect(registrationService.createRegistration).not.toHaveBeenCalled();
  });

  it('returns 500 when the service throws an error', async () => {
    const registrationService = {
      createRegistration: jest.fn().mockRejectedValue(new Error('db failure'))
    };

    const app = createApp({
      corsOrigin: 'http://localhost:4200',
      registrationService
    });

    const response = await request(app)
      .post('/api/registrations')
      .send({
        name: 'Anita Sharma',
        designation: 'Student',
        course: 'MERN',
        location: 'Bengaluru'
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Internal server error.');
  });
});
