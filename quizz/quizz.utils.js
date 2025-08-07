import Joi from "joi";

const titleAndDescSchema = Joi.string().required;

const tagsSchema = Joi.string().valid("vocabulary", "grammar", "conjugation", "culture").required;

const difficultySchema = Joi.string().valid("easy", "medium", "hard").required;