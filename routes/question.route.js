import QuestionController from "../questions/question.controller.js";
import { Router } from "express";

const router = Router();
const questionController = new QuestionController();

router.post("/", questionController.createQuestion);
router.get("/delete/:id", questionController.deleteQuestion);

export default router;
