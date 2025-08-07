import QuestionController from "../questions/question.controller.js";
import { Router } from "express";

const router = Router();
const questionController = new QuestionController();

router.post("/", (req, res, next) => {
  questionController.createQuestion(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    questionController.deleteQuestion(req, res, next);
});

export default router;
