import Question from "./question.model.js";

class QuestionRepository {
  async saveQuestion({ type, subject, answer, quizzId }) {
    const newQuestion = new Question({ type, subject, answer, quizzId });

    await newQuestion.save();

    return newQuestion._id;
  }
}

export default QuestionRepository;
