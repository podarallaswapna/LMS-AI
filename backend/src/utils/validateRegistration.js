function normalizeField(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function createRegistrationValidator(payload) {
  const value = {
    name: normalizeField(payload && payload.name),
    designation: normalizeField(payload && payload.designation),
    course: normalizeField(payload && payload.course),
    location: normalizeField(payload && payload.location)
  };

  const errors = {};

  if (!value.name) {
    errors.name = 'Name is required.';
  } else if (value.name.length > 120) {
    errors.name = 'Name must be 120 characters or fewer.';
  }

  if (!value.designation) {
    errors.designation = 'Designation is required.';
  } else if (value.designation.length > 120) {
    errors.designation = 'Designation must be 120 characters or fewer.';
  }

  if (!value.course) {
    errors.course = 'Course is required.';
  } else if (value.course.length > 120) {
    errors.course = 'Course must be 120 characters or fewer.';
  }

  if (!value.location) {
    errors.location = 'Location is required.';
  } else if (value.location.length > 120) {
    errors.location = 'Location must be 120 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    value
  };
}

module.exports = { createRegistrationValidator };
