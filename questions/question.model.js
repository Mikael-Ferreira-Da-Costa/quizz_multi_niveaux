import mongoose, { Schema } from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    option: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ["Checkbox", "Input", "Inputs"], required: true },
  subject: {
    type: [{ type: String, required: true }],
    required: true,
    validate: {
      validator: (value) => Array.isArray(value) && value.length > 0,
      message: "Subject must contain at least one value",
    },
  },
  answers: {
    type: [{ type: answerSchema, required: true }],
    validate: {
      validator: (value) => {
        return (
          Array.isArray(value) &&
          value.every(
            (item) =>
              typeof item.option === "string" &&
              typeof item.isCorrect === "boolean"
          ) &&
          value.some((item) => item.isCorrect)
        );
      },
      message:
        "Each answer element should be at format { option: string, isCorrect: boolean }\nAt least one answer must be correct",
    },
    required: true,
  },
  quizzId: {
    type: Schema.Types.ObjectId,
    ref: "Quizz",
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
