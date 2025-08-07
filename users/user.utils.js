import Joi from "joi";
import { ObjectId } from "mongodb";

const userValidationSchema = new Joi.object(
  {
    username: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }
);

const userUpdateValidationSchema = new Joi.object(
  {
    _id: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid", { value });
      }
      return value;
    })
    .required(),
    username: Joi.string().min(1).optional(),
    email: Joi.string().email().optional()
  }
);

export { userValidationSchema, userUpdateValidationSchema };

