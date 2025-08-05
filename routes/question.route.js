import QuestionController from "../questions/question.controller.js";
import { Router } from "express";

const router = Router();
const questionController = new QuestionController();

router.post("/createQuestion/", questionController.createQuestion);

export default router;
