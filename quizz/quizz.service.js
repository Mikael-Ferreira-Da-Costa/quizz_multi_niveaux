import quizzRepository from "./quizz.repository.js";
import quizzValidationSchema from "./quizz.utils.js";

class QuizzService {
  async createQuizz(quizzData) {
    const result = quizzValidationSchema.validate(quizzData);

    if (result.error) throw result.error;

    return await quizzRepository.create(quizzData);
  }
  async addQuestionToQuizz(quizzId, questionId) {
    await quizzRepository.addQuestionToQuizz(
      quizzId,
      questionId
    );
  }
  async deleteQuestionFromQuizz(params) {
    await quizzRepository.deleteQuestionFromQuizz(params);
  }
}

export default QuizzService;
