import QuestionService from "./question.service.js";

class QuestionController {
  questionService = new QuestionService();

  async createQuestion(req, res, next) {
    try {
      await this.questionService.createQuestion(req.body);
      res.status(201).json({ message: "Question created !" });
    } catch (err) {
      console.error(err);

      next(err);
    }
  }
}

export default QuestionController;
