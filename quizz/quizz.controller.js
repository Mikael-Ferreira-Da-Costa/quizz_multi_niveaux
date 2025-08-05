import Quizz from "./quizz.model.js";
import quizzRepository from "./quizz.repository.js";

class QuizzController {
  async createQuizz(req, res, next) {
    const { title, description } = req.body;
    try {
      const newQuizz = new Quizz({ title, description });
      await quizzRepository.create(newQuizz);
      res.status(201).json("Quizz created successfully");
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async findQuizz(req, res, next) {
    try{
    const findedQuizz = await quizzRepository.findById(req.params.id);
    if (!findedQuizz) {
      return res.status(404).json("Quizz not found");
    }
    res.status(200).json("Quizz found successfully", findedQuizz);
  }
  catch (error) {
    console.error(error);
    next(error);
  }
}
    async findAllQuizzes(req, res, next) {
        try {
            const allQuizzes = await quizzRepository.findAll();
            res.status(200).json(allQuizzes);
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export default QuizzController;
// const findedQuizz = await quizzRepository.findById(newQuizz._id);
//     res.status(200).json("Quizz found successfully", findedQuizz);
