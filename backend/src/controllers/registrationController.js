const { createRegistrationValidator } = require('../utils/validateRegistration');
const { createRegistrationService } = require('../services/registrationService');

function buildRegistrationController(options = {}) {
  const registrationService =
    options.registrationService || createRegistrationService();

  async function createRegistration(req, res, next) {
    try {
      const { isValid, errors, value } = createRegistrationValidator(req.body);

      if (!isValid) {
        return res.status(400).json({
          message: 'Validation failed.',
          errors
        });
      }

      const created = await registrationService.createRegistration(value);

      return res.status(201).json({
        message: 'Registration created successfully.',
        data: created
      });
    } catch (error) {
      return next(error);
    }
  }

  return { createRegistration };
}

module.exports = { buildRegistrationController };
