import Question from "./question.model.js";

class QuestionRepository {
  async saveQuestion(params) {
    const newQuestion = new Question(params);

    await newQuestion.save();

    return newQuestion._id;
  }

  async deleteQuestionsFromQuizz(quizzId) {
    await Question.deleteMany({ quizzId: quizzId });
  }

  async deleteQuestion(id) {
    await Question.findByIdAndDelete(id);
  }
}

export default QuestionRepository;
