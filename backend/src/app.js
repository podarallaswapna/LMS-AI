const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const registrationRoutes = require('./routes/registrationRoutes');
const courseRoutes = require('./routes/courseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFoundHandler } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

function createApp(options = {}) {
  const app = express();
  const corsOrigin = options.corsOrigin || '*';
  const registrationService = options.registrationService;
  const courseService = options.courseService;
  const dashboardService = options.dashboardService;

  app.use(cors({ origin: corsOrigin }));
  app.use(morgan('combined'));
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Backend service is healthy.' });
  });

  app.use(
    '/api/registrations',
    registrationRoutes({ registrationService })
  );
  app.use('/api/courses', courseRoutes({ courseService }));
  app.use('/api/dashboard', dashboardRoutes({ dashboardService }));
  app.use('/api/users', userRoutes());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
