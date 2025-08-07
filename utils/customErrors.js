import Joi from "joi";
const { ValidationError: JoiValidationError } = Joi;

class ArgumentRequiredError extends Error {
  constructor(message = "Missing Data required") {
    super(message);
    this.name = "ArgumentRequired";
    this.statusCode = 400;
  }
}

class IncorrectDataError extends Error {
  constructor(message = "Incorrect Data") {
    super(message);
    this.name = "IncorrectData";
    this.statusCode = 401;
  }
}

class UserNotFoundError extends Error {
  constructor(message = "User not found") {
    super(message);
    this.name = "UserNotFound";
    this.statusCode = 404;
  }
}

class UserAlreadyExistError extends Error {
  constructor(message = "User Already Exist") {
    super(message);
    this.name = "UserAlreadyExist";
    this.statusCode = 409;
  }
}

class UnexpectedError extends Error {
  constructor(message = "An unexpected error occurred") {
    super(message);
    this.name = "UnexpectedError";
    this.statusCode = 500;
  }
}

class QuizzNotFoundError extends Error {
  constructor(message = "Quizz not found") {
    super(message);
    this.name = "QuizzNotFound";
    this.statusCode = 404;
  }
}

function parseError(error) {
  if (error.isJoi || error instanceof JoiValidationError) {
    const details =
      error.details?.map((d) => d.message).join(", ") || error.message;
    return new ArgumentRequiredError(details);
  }

  if (
    error.name === "ValidationError" &&
    error._message?.includes("validation failed")
  ) {
    return new IncorrectDataError(error.message);
  }

  if (error.code === 11000) {
    return new UserAlreadyExistError(
      "Duplicate field: " + Object.keys(error.keyValue).join(", ")
    );
  }

  if (error instanceof Error) {
    const customErrors = [
      "UserNotFound",
      "UserAlreadyExist",
      "IncorrectData",
      "ArgumentRequired",
      "QuizzNotFound",
    ];

    if (customErrors.includes(error.name))
      return error;
  }

  if (error.statusCode) return error;

  return new UnexpectedError(error.message || "An unexpected error occurred");
}

export {
  ArgumentRequiredError,
  IncorrectDataError,
  UserNotFoundError,
  UserAlreadyExistError,
  UnexpectedError,
  QuizzNotFoundError,
  parseError,
};
