import Question from "./question.model";

class QuestionRepository {
  async saveQuestion({ type, subject, answer }) {
    const newQuestion = new Question({ type, subject, answer });
    await newQuestion.save();
  }
}

export default QuestionRepository;
