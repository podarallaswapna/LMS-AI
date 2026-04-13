const { pool } = require('../config/database');

function createRegistrationService(customPool = pool) {
  return {
    async createRegistration(payload) {
      const sql = `
        INSERT INTO course_registrations (name, designation, course, location)
        VALUES (?, ?, ?, ?)
      `;

      const params = [
        payload.name,
        payload.designation,
        payload.course,
        payload.location
      ];

      const [result] = await customPool.execute(sql, params);

      return {
        id: result.insertId,
        ...payload
      };
    }
  };
}

module.exports = { createRegistrationService };
