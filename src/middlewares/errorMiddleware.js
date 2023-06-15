const errorMiddleware = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
};

module.exports = errorMiddleware;
