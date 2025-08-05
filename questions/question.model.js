import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema({
  type: { type: "Checkbox" | "Input" | "Inputs", required: true },
  subject: { type: String | [String], required: true },
  answer: { type: Number | String | [String], required: true },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
