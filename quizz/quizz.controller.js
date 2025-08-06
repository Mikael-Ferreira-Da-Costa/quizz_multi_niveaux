import { createQuizz } from "./quizz.service.js";
import quizzRepository from "./quizz.repository.js";

class QuizzController {
  async createQuizz(req, res, next) {
    try {
      const savedQuizz = await createQuizz(req.body);
      res.status(201).json({
        message: "Quizz created successfully",
        data: savedQuizz,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
      next(error);
    }
  }
  async findQuizz(req, res, next) {
    try {
      const findedQuizz = await quizzRepository.findById(req.params.id);
      if (!findedQuizz) {
        return res.status(404).json("Quizz not found");
      }
      res.status(200).json("Quizz found successfully", findedQuizz);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async findAllQuizzes(req, res, next) {
    try {
      const allQuizzes = await quizzRepository.findAll();
      res.status(200).json(allQuizzes);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async addQuestionToQuizz(quizzId, questionId) {
    const updatedQuizz = await quizzRepository.addQuestionToQuizz(
      quizzId,
      questionId
    );
  }
}

export default QuizzController;
