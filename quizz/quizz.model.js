import mongoose, { Schema } from "mongoose";

const quizzSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  tags: {
    type: [String],
    required: true,
    enum: ["vocabulary", "grammar", "conjugation", "culture"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  }
});

const Quizz = mongoose.model("Quizz", quizzSchema);

export default Quizz;
