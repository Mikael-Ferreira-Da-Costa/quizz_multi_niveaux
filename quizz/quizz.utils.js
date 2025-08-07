import Joi from "joi";
import { ObjectId } from "mongodb";

const quizzValidationSchema = new Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  questions: Joi.array()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .optional(),
  tags: Joi.array()
    .items(
      Joi.string().valid("vocabulary", "grammar", "conjugation", "culture")
    )
    .unique()
    .required(),
  difficulty: Joi.string().valid("easy", "medium", "hard").required()
});

export default quizzValidationSchema;
