const { NotFoundError } = require("../utils/request");

// If there are any error when API Hit, this function will be run
exports.errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const errors = err.errors || [];
  let message = err.message;
  if (status == 500) {
    message = "Internal Server Error";
  }

  res.status(status).json({
    success: false,
    data: null,
    message,
    errors,
  });
};

// This handler is for 404 not found URL
exports.notFoundURLHandler = (req, res, next) => {
  throw new NotFoundError("URL is Not Found!");
};
