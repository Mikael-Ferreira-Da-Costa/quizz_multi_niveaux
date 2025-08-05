import QuestionService from "./question.service";

class QuestionController {
  questionService = new QuestionService();

  async createQuestion(req, res, next) {
    const { type, subject, answer } = req.body;

    try {
      await this.questionService.createQuestion({
        type,
        subject,
        answer,
      });
      res
        .status(201)
        .json({ message: "Question created !"});
    } catch (err) {
      console.error(err);

      next(err);
    }
  }
}

export default QuestionController;
