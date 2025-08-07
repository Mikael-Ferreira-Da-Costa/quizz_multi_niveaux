import QuizzService from "./quizz.service.js";
import quizzRepository from "./quizz.repository.js";
import { parseError } from "../utils/customErrors.js";

class QuizzController {
  quizzService = new QuizzService();

  async createQuizz(req, res, next) {
    try {
      const savedQuizz = await this.quizzService.createQuizz(req.body);
      res.status(201).json({
        message: "Quizz created successfully",
        data: savedQuizz,
      });
    } catch (error) {
      next(parseError(error));
    }
  }
  async findQuizz(req, res, next) {
    try {
      const findedQuizz = await quizzRepository.findById(req.body);
      if (!findedQuizz) {
        return res.status(404).json("Quizz not found");
      }
      res.status(200).json({ message: "Quizz found successfully", data: findedQuizz });
    } catch (error) {
      next(parseError(error));
    }
  }
  async findAllQuizzes(req, res, next) {
    try {
      const allQuizzes = await quizzRepository.findAll();
      res.status(200).json(allQuizzes);
    } catch (error) {
      next(parseError(error));
    }
  }
  async deleteQuizz(req ,res, next){
    try{
    await quizzRepository.deleteById(req.params.id);
    res.status(200).json({message: "Quizz deleted succesfully", data: req.params.id});
    }catch(error){
      next(parseError(error));
    }
  }
}

export default QuizzController;
