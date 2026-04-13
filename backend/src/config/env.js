const dotenv = require('dotenv');

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number.parseInt(process.env.PORT || '4000', 10),
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number.parseInt(process.env.DB_PORT || '3306', 10),
  dbName: process.env.DB_NAME || 'Mysqltest',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  dbConnectionLimit: Number.parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10)
};

module.exports = { env };
