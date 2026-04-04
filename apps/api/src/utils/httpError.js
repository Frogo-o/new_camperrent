function httpError(status, code, message, details) {
  const err = new Error(message);
  err.status = status;
  err.body = {
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
    },
  };
  return err;
}

module.exports = { httpError };
