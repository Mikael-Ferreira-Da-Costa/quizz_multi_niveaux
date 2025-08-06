import mongoose, { Schema } from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    option: String,
    isCorrect: Boolean,
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ["Checkbox", "Input", "Inputs"], required: true },
  subject: { type: [String], required: true },
  answer: {
    type: [answerSchema],
    validate: {
      validator: function (value) {
        return (
          Array.isArray(value) &&
          value.every(
            (item) =>
              typeof item.option === "string" &&
              typeof item.isCorrect === "boolean"
          )
        );
      },
      message:
        "Each answer element should be at format { option: string, isCorrect: boolean }",
    },
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
