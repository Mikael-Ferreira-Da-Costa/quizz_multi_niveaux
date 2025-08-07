import questionValidationSchema from "./question.utils.js";
import QuestionRepository from "./question.repository.js";
import QuizzService from "../quizz/quizz.service.js";
import Question from "./question.model.js";

class QuestionService {
  questionRepository = new QuestionRepository();

  async createQuestion(params) {
    const quizzService = new QuizzService();
    const result = questionValidationSchema.validate(params);

    if (result.error) throw result.error;

    const questionId = await this.questionRepository.saveQuestion(params);

    await quizzService.addQuestionToQuizz(params.quizzId, questionId);
  }

  async deleteQuestions(quizzId) {
    await this.questionRepository.deleteQuestionsFromQuizz(quizzId);
  }

  async deleteQuestion(id) {
    const quizzService = new QuizzService();
    const question = await Question.findById(id);

    await quizzService.deleteQuestionFromQuizz({
      questionId: question._id,
      quizzId: question.quizzId,
    });
    await this.questionRepository.deleteQuestion(id);
  }
}

export default QuestionService;
