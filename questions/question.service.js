import QuizzController from "../quizz/quizz.controller.js";
import QuestionRepository from "./question.repository.js";

class QuestionService {
  questionRepository = new QuestionRepository();
  quizzController = new QuizzController();

  async createQuestion(params) {
    const questionId = await this.questionRepository.saveQuestion(params);

    await this.quizzController.addQuestionToQuizz(params.quizzId, questionId);
  }
}

export default QuestionService;
