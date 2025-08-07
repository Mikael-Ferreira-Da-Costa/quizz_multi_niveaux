const errorHandler = (err, req, res, next) => {
  console.error("Error occurred:", err);

  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.name,
    message: err.message,
  });
};

export default errorHandler;
