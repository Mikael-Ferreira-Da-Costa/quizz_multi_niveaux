const errorHandler = (err, req, res, next) => {
  console.log("Middleware error object:", err);
  console.log("Name:", err.name, "Status:", err.statusCode, "Message:", err.message);

  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.name,
    message: err.message,
  });
};

export default errorHandler;
