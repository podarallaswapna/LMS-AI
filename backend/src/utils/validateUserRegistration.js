function validateUserRegistration(data) {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    return { error: 'Name is required and must be at least 2 characters.' };
  }
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return { error: 'A valid email is required.' };
  }
  if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }
  return { error: null };
}

module.exports = { validateUserRegistration };
