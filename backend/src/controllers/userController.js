const { createUserService } = require('../services/userService');
const { validateUserRegistration } = require('../utils/validateUserRegistration');

function buildUserController(options = {}) {
  const userService = options.userService || createUserService();

  async function registerUser(req, res, next) {
    try {
      const { error } = validateUserRegistration(req.body);
      if (error) {
        return res.status(400).json({ message: error });
      }
      await userService.registerUser(req.body);
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
      return next(err);
    }
  }

  return { registerUser };
}

module.exports = { buildUserController };
