function errorHandler(err, _req, res, _next) {
  console.error(err);

  if (err && err.code === 'ER_ACCESS_DENIED_ERROR') {
    return res.status(500).json({
      message: 'Database authentication failed.'
    });
  }

  if (err && err.code === 'ER_NO_SUCH_TABLE') {
    return res.status(500).json({
      message: 'Database table is missing.'
    });
  }

  return res.status(500).json({
    message: 'Internal server error.'
  });
}

module.exports = { errorHandler };
