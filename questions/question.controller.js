import QuestionService from "./question.service.js";
import { parseError } from "../utils/customErrors.js";

class QuestionController {
  questionService = new QuestionService();

  async createQuestion(req, res, next) {
    try {
      await this.questionService.createQuestion(req.body);
      res.status(201).json({ message: "Question created !" });
    } catch (err) {
      next(parseError(err));
    }
  }

  async deleteQuestion(req, res, next) {
    try {
      await this.questionService.deleteQuestion(req.params.id);
      res.status(201).json({ message: "Question deleted !" });
    } catch (err) {
      next(parseError(err));
    }
  }
}

export default QuestionController;
