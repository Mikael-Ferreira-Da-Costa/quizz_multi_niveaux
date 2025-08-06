import QuestionController from "../questions/question.controller.js";
import { Router } from "express";

const router = Router();
const questionController = new QuestionController();

router.post("/", (req, res, next) => {
  questionController.createQuestion(req, res, next);
});

export default router;
