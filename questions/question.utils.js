import Joi from "joi";
import { ObjectId } from "mongodb";

const answerSchema = Joi.object({
  option: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
});

const questionValidationSchema = Joi.object({
  type: Joi.string().valid("Checkbox", "Input", "Inputs").required(),

  subject: Joi.array().items(Joi.string().required()).min(1).required(),

  answers: Joi.array()
    .items(answerSchema)
    .min(1)
    .required()
    .custom((value, helpers) => {
      const hasCorrect = value.some((a) => a.isCorrect === true);
      if (!hasCorrect) {
        return helpers.error("any.custom", {
          message: "At least one answer must be correct.",
        });
      }
      return value;
    }, "At least one correct answer validator"),

  quizzId: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .optional(),
});

export default questionValidationSchema;
