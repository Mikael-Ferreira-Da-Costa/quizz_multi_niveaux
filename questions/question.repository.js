import Question from "./question.model.js";

class QuestionRepository {
  async saveQuestion(params) {
    const newQuestion = new Question(params);

    await newQuestion.save();

    return newQuestion._id;
  }
}

export default QuestionRepository;
