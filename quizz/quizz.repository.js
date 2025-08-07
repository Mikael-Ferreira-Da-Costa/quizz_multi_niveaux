import Quizz from "./quizz.model.js";
import QuestionService from "../questions/question.service.js";
import { QuizzNotFoundError } from "../utils/customErrors.js";

class QuizzRepository {
  async create(quizzData) {
    const newQuizz = new Quizz(quizzData);
    return await newQuizz.save();
  }
  async findById(id) {
    return await Quizz.findById(id).populate("questions");
  }
  async findAll() {
    return await Quizz.find().populate("questions");
  }
  async addQuestionToQuizz(quizzId, questionId) {
    const updated =  await Quizz.findByIdAndUpdate(
      quizzId,
      { $push: { questions: questionId } },
      { new: true }
    ).populate("questions");
    if (!updated)
      throw new QuizzNotFoundError();
  }
  async deleteQuestionFromQuizz({ questionId, quizzId }) {
    return await Quizz.findByIdAndUpdate(quizzId, {
      $pull: { questions: questionId },
    });
  }
  async deleteById(id) {
    const questionService = new QuestionService();

    await questionService.deleteQuestions(id);

    return await Quizz.findByIdAndDelete(id);
  }
}

export default new QuizzRepository();
