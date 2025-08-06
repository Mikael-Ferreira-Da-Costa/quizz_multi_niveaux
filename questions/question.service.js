import QuestionRepository from "./question.repository.js";

class QuestionService {
  questionRepository = new QuestionRepository();

  async createQuestion({ type, subject, answer }) {
    await this.questionRepository.saveQuestion({ type, subject, answer });
  }
}

export default QuestionService;
