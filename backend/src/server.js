const { createApp } = require('./app');
const { env } = require('./config/env');

const app = createApp({ corsOrigin: env.corsOrigin });

app.listen(env.port, () => {
  // Keep startup log simple for container and process-manager visibility.
  console.log(`Backend API listening on port ${env.port}`);
});
