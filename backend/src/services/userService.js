const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

function createUserService(customPool = pool) {
  return {
    async registerUser({ name, email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await customPool.execute(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword]
      );
    }
  };
}

module.exports = { createUserService };
