import QuizzController from "../quizz/quizz.controller.js";
import QuestionRepository from "./question.repository.js";

class QuestionService {
  questionRepository = new QuestionRepository();
  quizzController = new QuizzController();

  async createQuestion({ type, subject, answer, quizzId }) {
    const questionId = await this.questionRepository.saveQuestion({ type, subject, answer, quizzId });
    await this.quizzController.addQuestionToQuizz(quizzId, questionId);
  }
}

export default QuestionService;
