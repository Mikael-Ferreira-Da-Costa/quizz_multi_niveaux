import QuizzController from "../quizz/quizz.controller.js";
import questionValidationSchema from "./question.utils.js";
import QuestionRepository from "./question.repository.js";

class QuestionService {
  questionRepository = new QuestionRepository();
  quizzController = new QuizzController();

  async createQuestion(params) {
    const result = questionValidationSchema.validate(params);
  
    if (result.error)
      throw result.error;

    const questionId = await this.questionRepository.saveQuestion(params);

    await this.quizzController.addQuestionToQuizz(params.quizzId, questionId);
  }
}

export default QuestionService;
